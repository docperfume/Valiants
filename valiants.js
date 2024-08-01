const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const { DateTime } = require('luxon');
const colors = require('colors');

class ValiantAPI {
    constructor(token) {
        this.token = token;
        this.headers = {
            'Content-Type': 'text/x-component',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36',
            'Accept': 'text/x-component',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Origin': 'https://mini.playvaliants.com',
            'Referer': 'https://mini.playvaliants.com/',
            'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Next-Action': '2a0717c329f249700fe8e3898400c305762181ee'
        };
    }

    async getData() {
        const url = 'https://mini.playvaliants.com/';
        const payload = [
            "/user/data",
            this.token
        ];

        const rawData = await this.http(url, 'POST', payload);
        if (rawData) {
            const jsonString = rawData.substring(rawData.indexOf('{'), rawData.lastIndexOf('}') + 1);

            try {
                const jsonData = JSON.parse(jsonString);
                return jsonData;
            } catch (error) {
                this.log('Invalid JSON string: ' + error, 'error');
                return null;
            }
        } else {
            return null;
        }
    }
    
    

    async claimDailyReward() {
        const url = 'https://mini.playvaliants.com/';
        const payload = [
            "/rewards/claim",
            this.token,
            {}
        ];

        const rawData = await this.http(url, 'POST', payload);
        if (rawData) {
            const jsonString = rawData.substring(rawData.indexOf('{'), rawData.lastIndexOf('}') + 1);

            try {
                const jsonData = JSON.parse(jsonString);
                return jsonData;
            } catch (error) {
                this.log('Invalid JSON string: ' + error, 'error');
                return null;
            }
        } else {
            return null;
        }
    }

    async taptap(payload) {
        const url = 'https://mini.playvaliants.com/';
        const rawData = await this.http(url, 'POST', payload);
        if (rawData) {
            const jsonString = rawData.substring(rawData.indexOf('{'), rawData.lastIndexOf('}') + 1);

            try {
                const jsonData = JSON.parse(jsonString);
                return jsonData;
            } catch (error) {
                this.log('Invalid JSON string: ' + error, 'error');
                return null;
            }
        } else {
            return null;
        }
    }

    async getMission() {
        const url = 'https://mini.playvaliants.com/';
        const payload = [
            "/user/missions",
            this.token
        ];
        const rawData = await this.http(url, 'POST', payload);
        if (rawData) {
            const jsonString = rawData.substring(rawData.indexOf('{'), rawData.lastIndexOf('}') + 1);

            try {
                const jsonData = JSON.parse(jsonString);
                return jsonData;
            } catch (error) {
                this.log('Invalid JSON string: ' + error, 'error');
                return null;
            }
        } else {
            return null;
        }
    }

    async claimMission(payload) {
        const url = 'https://mini.playvaliants.com/';
        const rawData = await this.http(url, 'POST', payload);
        if (rawData) {
            const jsonString = rawData.substring(rawData.indexOf('{'), rawData.lastIndexOf('}') + 1);

            try {
                const jsonData = JSON.parse(jsonString);
                return jsonData;
            } catch (error) {
                this.log('Invalid JSON string: ' + error, 'error');
                return null;
            }
        } else {
            return null;
        }
    }


    async upgradeEnergy() {
        const url = 'https://mini.playvaliants.com/earn/';
        const payload = [
            "/perks/energy-level-up",
            this.token,
            {}
        ];

        const rawData = await this.http(url, 'POST', payload);
        if (rawData) {
            const jsonString = rawData.substring(rawData.indexOf('{'), rawData.lastIndexOf('}') + 1);

            try {
                const jsonData = JSON.parse(jsonString);
                return jsonData;
            } catch (error) {
                this.log('Invalid JSON string: ' + error, 'error');
                return null;
            }
        } else {
            return null;
        }
    }

    async upgradeMultitap() {
        const url = 'https://mini.playvaliants.com/earn/';
        const payload = [
            "/perks/click-level-up",
            this.token,
            {}
        ];

        const rawData = await this.http(url, 'POST', payload);
        if (rawData) {
            const jsonString = rawData.substring(rawData.indexOf('{'), rawData.lastIndexOf('}') + 1);

            try {
                const jsonData = JSON.parse(jsonString);
                return jsonData;
            } catch (error) {
                this.log('Invalid JSON string: ' + error, 'error');
                return null;
            }
        } else {
            return null;
        }
    }

    async http(url, method = 'get', data = {}) {
        try {
            const response = await axios({ url, method, headers: this.headers, data });
            return response.data;
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400 && data.message.startsWith('Not enough experience')) {
                    this.log('Balance không đủ!'.red);
                } else {
                    this.log(`Lỗi rồi: ${status} ${error.response.statusText}`.red);
                }
            } else {
                this.log(`Lỗi rồi: ${error.message}`.red);
            }
            return null;
        }
    }
    
    

    log(msg, type = 'info') {
        const colorMap = {
            info: 'green',
            success: 'cyan',
            warning: 'yellow',
            error: 'red',
            default: 'white'
        };
        const color = colorMap[type] || colorMap.default;
        console.log(`[*] ${msg}`[color]);
    }

    async getConfig() {
        const url = 'https://mini.playvaliants.com/';
        const payload = [
            "/gameplay/config",
            this.token
        ];
        const rawData = await this.http(url, 'POST', payload);
        if (rawData) {
            const jsonString = rawData.substring(rawData.indexOf('{'), rawData.lastIndexOf('}') + 1);

            try {
                const jsonData = JSON.parse(jsonString);
                return jsonData;
            } catch (error) {
                this.log('Invalid JSON string: ' + error, 'error');
                return null;
            }
        } else {
            return null;
        }

    }

    async unlock(payload) {
        const url = 'https://mini.playvaliants.com/team/';
        const rawData = await this.http(url, 'POST', payload);
        if (rawData) {
            const jsonString = rawData.substring(rawData.indexOf('{'), rawData.lastIndexOf('}') + 1);

            try {
                const jsonData = JSON.parse(jsonString);
                return jsonData;
            } catch (error) {
                this.log('Invalid JSON string: ' + error, 'error');
                return null;
            }
        } else {
            return null;
        }

    }

}

async function waitWithCountdown(delay) {
    for (let i = delay; i >= 0; i--) {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`===== Đã hoàn thành tất cả tài khoản, chờ ${i} giây để tiếp tục vòng lặp =====`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('');
}

const loadCredentials = () => {
    try {
        const data = fs.readFileSync('token.txt', 'utf-8');
        return data.split('\n').map(line => line.trim());
    } catch (err) {
        console.error("File token.txt not found or an error occurred:".red, err);
        return [];
    }
};

const main = async () => {
    const queries = loadCredentials();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const mission = await new Promise(resolve => rl.question("Bạn có muốn tự động làm nhiệm vụ không? (y/n): ", resolve));
    const upteam = await new Promise(resolve => rl.question("Bạn có muốn tự động mua thẻ (TEAM) không? (y/n): ", resolve));
    const autoUpdate = await new Promise(resolve => rl.question("Bạn có muốn tự động nâng cấp không? (y/n): ", resolve));

    let maxLevel = 0;
    if (autoUpdate === 'y') {
        maxLevel = await new Promise(resolve => rl.question("Lv tối đa muốn nâng cấp: ", resolve));
        maxLevel = parseInt(maxLevel, 10);
    }
    rl.close();

    while (true) {
        for (const [index, token] of queries.entries()) {
            const api = new ValiantAPI(token);
            const rawData = await api.getData();

            console.log(`\n========== Tài khoản ${index + 1} ==========`.blue);

            if (rawData && rawData.data) {
                let { energy, energy_cap, experience, experience_per_hour, daily_reward, energy_level, click_level } = rawData.data;

                api.log(`Balance: ${experience}`, 'info');
                api.log(`Exp per Hour: ${experience_per_hour}/Hour`, 'info');
                api.log(`Năng Lượng: ${energy}/${energy_cap}`, 'info');

                if (!daily_reward.claimed) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    const dailyData = await api.claimDailyReward();
                    if (dailyData && dailyData.data) {
                        const day = dailyData.data.day;
                        const reward = dailyData.data.reward;
                        api.log(`Đã điểm danh thành công ngày ${day} | Phần thưởng: ${reward}`, 'success');
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    } else {
                        api.log('Không thể lấy dữ liệu điểm danh!', 'error');
                    }
                } else {
                    api.log('Hôm nay bạn đã điểm danh rồi!'.yellow, 'warning');
                }                

                if (upteam === 'y') {
                    const configData = await api.getConfig();
                    if (configData && configData.data && configData.data.unlocks) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        for (const id of Object.keys(configData.data.unlocks)) {
                            const payload = [
                                "/unlock",
                                token,
                                { id: parseInt(id, 10) }
                            ];
                            const unlockData = await api.unlock(payload);
                            if (unlockData) {
                                api.log(`Mở thẻ id ${id} thành công`, 'success');
                            } else {
                                api.log(`Mở thẻ id ${id} thất bại`, 'error');
                            }
                            await new Promise(resolve => setTimeout(resolve, 3000));
                        }
                    }
                }

                if (autoUpdate === 'y') {
                    if (energy_level < maxLevel) {
                        api.log("Nâng cấp năng lượng tối đa...");
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        const upgradeData = await api.upgradeEnergy();
                        if (upgradeData.error) {
                            if (upgradeData.error === 'Not enough experience') {
                                api.log(`Balance không đủ để nâng cấp năng lượng!`, 'error');
                            } else {
                                api.log(`Balance không đủ để nâng cấp năng lượng!`, 'error');
                            }
                        } else if (upgradeData.data && upgradeData.data.energy_level) {
                            api.log(`Năng lượng được nâng cấp lên lv ${upgradeData.data.energy_level}`, 'success');
                        } else {
                            api.log(`Trạng thái không xác định`, 'warning');
                        }
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                    if (click_level < maxLevel) {
                        api.log("Nâng cấp multitap...");
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        const upgradeData = await api.upgradeMultitap();
                        if (upgradeData.error) {
                            if (upgradeData.error === 'Not enough experience') {
                                api.log(`Balance không đủ để nâng cấp multitap!`, 'error');
                            } else {
                                api.log(`Balance không đủ để nâng cấp multitap!`, 'error');
                            }
                        } else if (upgradeData.data && upgradeData.data.click_level) {
                            api.log(`Multi được nâng cấp thành công lên lv ${upgradeData.data.click_level}`, 'success');
                        } else {
                            api.log(`Trạng thái không xác định`, 'warning');
                        }
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                }

                if (mission === 'y') {
                    const missionData = await api.getMission();
                    if (missionData && missionData.data && missionData.data.missions) {
                        for (const mission of missionData.data.missions) {
                            if (mission.type === 'referral') continue;
                            if (!mission.claimed) {
                                await new Promise(resolve => setTimeout(resolve, 2000));
                                const payload = [
                                    "/missions/claim",
                                    token,
                                    { id: mission.id }
                                ];
                                const claimData = await api.claimMission(payload);
                                if (claimData) {
                                    api.log(`Làm nhiệm vụ ${mission.id} thành công | Phần thưởng: ${claimData.data.reward}`, 'success');
                                }
                            }
                        }
                    }
                }

                while (true) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    const tap = Math.min(randomInt(50, 60), energy);
                    const payload = [
                        "/gameplay/click",
                        token,
                        { count: tap }
                    ];
                    const tapData = await api.taptap(payload);
                    
                    if (tapData && tapData.data) {
                        const newEnergy = tapData.data.user_energy;
                        const reward = tapData.data.reward;

                        api.log(`Tap được ${reward} lần, Năng lượng còn: ${newEnergy}`, 'success');
                    
                        energy = newEnergy;
                    } else {
                        api.log('Không thể lấy dữ liệu!'.red, 'error');
                        break;
                    }
                    
                    

                    if (energy < 50) {
                        api.log('Năng lượng dưới 50, dừng tap cho tài khoản này.', 'warning');
                        break;
                    }
                }
            } else {
                console.log('Dữ liệu trả về không hợp lệ hoặc không có dữ liệu người dùng.');
            }
        }
        const delay = randomInt(300, 500);
        await waitWithCountdown(delay);
    }
};



const randomInt = (min, max) => Math.floor(Math.random() * (min + (max - min + 1)));

main().catch(err => console.error(err.red));
