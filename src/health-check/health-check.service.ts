import { Inject, Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class HealthCheckService {

  constructor(@Inject('URL_ADDRESS') private url: string) {}

  async checkHealth(): Promise<any> {
    const { data } = await axios({
      method: "get",
      url: this.url
    });

    return data;
  }
}
