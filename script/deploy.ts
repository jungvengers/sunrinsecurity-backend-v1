

import env from "dotenv"
env.config()

import { NodeSSH } from "node-ssh"

const ssh = new NodeSSH()

const deploy = async () => {
    if (process.env.PORT) {
        await ssh.connect({
            host: process.env.HOST,
            username: process.env.ID,
            password: process.env.PW,
            port: process.env.PORT
        })
    }
    else {
        await ssh.connect({
            host: process.env.HOST,
            username: process.env.ID,
            password: process.env.PW
        })
    }
    await ssh.execCommand(`
        cd ~/backend &&
        git pull &&
        yarn build &&
        pm2 delete all &&
        docker ps &&
        yarn production - start
    `)
    process.exit(0)
}

deploy()