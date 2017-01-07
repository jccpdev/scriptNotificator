#!/usr/bin/env node

'use strict';

const PushBullet = require('pushbullet');
const _ = require('lodash');
const ConfigStore = require('configstore');
const pkg = require('../package.json');
const prompt = require('prompt');

class ScriptNotifier {

    constructor() {

        this.configKey = 'pushBulletKey';
        this.conf = new ConfigStore(pkg.name);

        if (!this.conf.get(this.configKey)) {
            return this.setPushBulletKey();
        }

        this.pusher = new PushBullet(this.conf.get(this.configKey));
    }

    getDevices() {
        return new Promise((resolve, reject) => {
            this.pusher.devices({}, (err, response)=> {
                if (err) {
                    return reject(err);
                }

                resolve(response.devices);
            });
        });

    }


    push(message = "Command Finished", deviceNickname = null, title = 'Command Finished') {


        this.getDevices()
            .then((devices) => {

                if (deviceNickname === null) {
                    return null
                }

                return _.find(devices, (d) => d.nickname === deviceNickname).iden;
            })
            .then((device_id) => {

                let device = {};

                if (device_id) {
                    device = device_id;
                }

                return this.pusher.note(device, title, message, (err, response) => {
                    if (err) {
                        throw new Error(err);
                    }
                });
            });


    }

    setPushBulletKey() {
        prompt.message = 'Please set a PushBullet Key';
        prompt.start();
        prompt.get(['key'], (err, result) => {
            this.conf.set(this.configKey, result.key);

            console.log('Thank you');
            prompt.stop();

        })

    }

    getPushBulletKey() {
        return this.conf.get(this.configKey);
    }

}

const notify = new ScriptNotifier();

const args = process.argv.splice(2);

switch (args[0]) {

    case '--setKey':
        return notify.setPushBulletKey();
    case '--getKey':
        console.log(notify.getPushBulletKey());
        return;
    default:
        stdin().then((message) => {
            notify.push(message, args[0], args[1]);
            console.log(message);
        });


}


function stdin() {

    return new Promise((resolve, reject) => {
        var data = '';

        process.stdin.setEncoding('utf8');
        process.stdin.on('readable', function () {
            var chunk = process.stdin.read();
            if (chunk !== null) data += chunk;
        });

        process.stdin.on('end', function () {
            return resolve(data);

        });
    });


}