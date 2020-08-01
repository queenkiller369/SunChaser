import Knex from "knex";
import { User } from "./models";
import AsyncRedis from "async-redis";
import Papa from "papaparse";
import fetch from "node-fetch";
import { hashPassword } from "../hash";
import { Request } from "express";

type PromisifiedRedisClient = ReturnType<typeof AsyncRedis.decorate>;

export class UserService {
  constructor(
    private knex: Knex,
    private redisClient: PromisifiedRedisClient
  ) {}

  async getWeatherForecast() {
    const url =
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=tc";
    const res = await fetch(url);
    const results = await res.json();
    // console.log(results);
    return results;
  }

  async getSunriseAndSunset() {
    const url = `https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=SRS&year=${new Date().getFullYear()}&rformat=csv`;
    const res = await fetch(url);
    const stream = (res.body as any) as NodeJS.ReadableStream;
    const getDataFromCSV = () =>
      new Promise<any>((resolve) => {
        Papa.parse<void>(stream, {
          dynamicTyping: true,
          complete: (results) => {
            resolve(results.data);
          },
        });
      });

    let now: any = new Date();
    let start: any = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    const today = Math.floor(diff / oneDay);
    const data = await getDataFromCSV();
    const todayData = data[today];
    const tomorrow = today + 1;
    const tomorrowData = data[tomorrow];

    const jsonStrTodayResults = JSON.stringify({
      date: `${todayData[0]}`,
      sunrise: `${todayData[1]}`,
      sunset: `${todayData[3]}`,
    });

    const jsonStrTomorrowResult = JSON.stringify({
      date: `${tomorrowData[0]}`,
      sunrise: `${tomorrowData[1]}`,
      sunset: `${tomorrowData[3]}`,
    });

    if (
      (await this.redisClient.get(`${todayData[0]} result`)) &&
      (await this.redisClient.get(`${tomorrowData[0]} result`))
    ) {
      const todayResult = JSON.parse(
        String(await this.redisClient.get(`${todayData[0]} result`))
      );
      const tomorrowResult = JSON.parse(
        String(await this.redisClient.get(`${tomorrowData[0]} result`))
      );
      return {
        todayResult,
        tomorrowResult,
      };
    } else {
      await this.redisClient.set(
        `${todayData[0]} result`,
        jsonStrTodayResults,
        "EX",
        86400
      );
      await this.redisClient.set(
        `${tomorrowData[0]} result`,
        jsonStrTomorrowResult,
        "EX",
        86400
      );
      const todayResult = JSON.parse(
        String(await this.redisClient.get(`${todayData[0]} result`))
      );
      const tomorrowResult = JSON.parse(
        String(await this.redisClient.get(`${tomorrowData[0]} result`))
      );
      return {
        todayResult,
        tomorrowResult,
      };
    }
  }

  async createUser(body: {
    user_email: string;
    user_password: string;
    user_name: string;
    user_role: string;
  }) {
    const { user_email, user_password, user_name, user_role } = body;

    const [userId] = await this.knex("users")
      .insert({
        email: user_email,
        password: await hashPassword(user_password),
        username: user_name,
        role: user_role,
      })
      .returning("id");
    return userId as number;
  }

  async loginGoogle(
    body: { userEmail: string; userName: string; userRole: string },
    req: Request
  ) {
    const users: User[] = await this.knex
      .select("*")
      .from("users")
      .where("email", body.userEmail);

    let user = users[0];
    if (!user) {
      // 開返個新account
      user = await this.knex("users").insert({
        email: body.userEmail,
        password: await hashPassword(Math.random().toString(36).substring(2)),
        username: body.userName,
        created_at: new Date(),
        updated_at: new Date(),
        role: body.userRole,
      });
    }
    if (req.session) {
      req.session.user = user;
    }
  }

  async loggedInWeb(userID: number) {
    const user = await this.knex
      .select("username")
      .from("users")
      .where("id", userID);
    console.log(user);
    return user;
  }

  async getUserByEmail(email: string) {
    return (await this.knex.raw(`SELECT * FROM users WHERE email = ?`, [email]))
      .rows[0];
  }

  async getUserById(id: number) {
    return (await this.knex.raw(`SELECT * FROM users WHERE id = ?`, [id]))
      .rows[0];
  }
}
