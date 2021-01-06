import url from 'url';
import { spawn } from 'child_process';
import fs from 'fs';
import { join } from 'path';
import { InternalServerErrorException } from '@nestjs/common';

export function downloadFileCurl(file_url) {
  const file_name = url.parse(file_url).pathname.split('/').pop();
  const file = fs.createWriteStream(join('..', '..', '..', 'test') + file_name);
  const curl = spawn('curl', [file_url]);

  curl.stdout.on('data', (data) => file.write(data));
  curl.stdout.on('end', (data) => {
    file.end();
    console.log(file_name + ' downloaded to ' + join('..', '..', '..', 'test'));
  });
  curl.on('exit', (code) => {
    if (code != 0) throw new InternalServerErrorException();
  });
}
