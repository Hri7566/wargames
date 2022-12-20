const net = require('net');

const prompts = {
    logon: 'LOGON:  ',
    falken: ''
}

const help = {
    default: '\nHELP NOT AVAILABLE\n\n',
    'games': `\n
‘GAMES‘ REFERS TO MODELS, SIMULATIONS AND GAMES
WHICH HAVE TACTICAL AND STRATEGIC APPLICATIONS\n\n`
}

const list = {
    default: 'LIST NOT AVAILABLE\n',
    'games': `
FALKEN‘S MAZE
BLACK JACK
GIN RUMMY
HEARTS
BRIDGE
CHECKERS
CHESS
POKER
FIGHTER COMBAT
GUERRILLA ENGAGEMENT
DESERT WARFARE
AIR-TO-GROUND ACTIONS
THEATERWIDE TACTICAL WARFARE
THEATERWIDE BIOTOXIC AND CHEMICAL WAREFARE

GLOBAL THERMONUCLEAR WAR

`
}

const badIndent = `
INDENTIFICATION NOT RECOGNIZED BY SYSTEM
--CONNECTION TERMINATED--`;

const logon = `Joshua`;
const joshuaData =[
`↑45     ↑↑456         ↑↑009         ↑↑893       ↑↑972        ↑↑315
PRT CON. 3.4.5. SECTRAN 9.4.3.                  PORT STAT: SD-345
(311) 699-7305
KEEP-HAD-ONSCREEN-DONT-PAR`,
`



























































(311) 767-8739
(311) 936-2364
-           PRT. STAT.                                   CRT. DEF.
     888-8884-==================================================
FSKDJLSD: SDSDKJ: SDFJSL:                           DKSJL: SKFJJ: SDKFJLJ:
SYSPROC FUNCT READY                            ALT NET READY
CPU AUTH RV-345-AX8            SYSCOMP STATUS: ALL PORTS ACTIVE
22/34534.90/3209                                          ↑↑CVB-3904-39490
(311) 936-2364
PRINT 18293084748484845   READ LINES VERIFY CODE 8/4/5/2
(311) 936-3582
22/34534.90/3209                                          ↑↑CVB-3904-39490
`,
`














































12934-AD-43KJ: CONTR PAK
(311) 767-1083
    FLD CRS: 33.04.543    KDBS: 34/56/67/83/  STATUS FLT  C34/304







    `,
`



















4094-47278DONTR PAR
ff#5-45-F6-3456                   NOPR STATUS: TRAK OFF    PRON ACTIVE
#45:45:45 ↑↑ WER: 45/29/01  XCOMP: 43239582  YCOMP:3492930D  ZCOMP:343906834
FROM 04-#S-45-F6-3456                                 TRON: 65#65/74/84/65/87
-          PRT. STAT.                                    CRT. DEF.
(311) 936-3582==================================================
            3453                                            3594














            `,
`



























































































FL342    TK01    BM97    RG01    P/90    GJ82    FP03    ZW08    JM89
REF TAPCON: 43.45342.349
SYSPROC FUNCT READY                           ALT NET READY

CPU AUTH KV-345-AXB          SYSCOMP STATUS:  ALL PORTS ..



















(311) 936-2364
*************************************************************************************
FROM 43-#S-45-F6-3456                  NO
D0D000D0D0D0030D0FK30FIOW0DOE0F0D0FKE0D93
`,
`






























































































































































































































































































































































































































\n\n`
];

const greetings = `GREETINGS PROFESSOR FALKEN.\n\n`

/**
 * Slow write text to a socket
 * @param {net.Socket} socket TCP Socket
 * @param {string} text String to slow write
 */
const slowWrite = (socket, text) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            setTimeout(() => {
                if (socket.closed) return;
                socket.write(char);

                if (i == text.length - 1) {
                    resolve();
                }
            }, i * 1000 / 24);
        }
    });
}

/**
 * Fast write text to a socket
 * @param {net.Socket} socket TCP Socket
 * @param {string} text String to slow write
 */
const fastWrite = (socket, text) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            setTimeout(() => {
                if (socket.closed) return;
                socket.write(char);

                if (i == text.length - 1) {
                    resolve();
                }
            }, i * 1000 / 500);
        }
    });
}

const server = new net.createServer(socket => {
    let prompt = prompts.logon;
    let ready = false;

    // socket.on('connect', () => {
    //     socket.write(prompt);
    // });

    let falkenCount = 0;

    socket.on('data', async data => {
        msg = data.toString();

        if (!ready) {
            if (msg == 'wargames') {
                ready = true;
                await slowWrite(socket, prompt);
            }

            return;
        }

        let writePrompt = true;
        
        promptSwitch:
        switch (prompt) {
            case prompts.logon:
                if (msg.toLowerCase().startsWith('Help'.toLowerCase())) {
                    let index = msg.substring('Help '.length).trim().toLowerCase();
                    let h = help[index];
                    await slowWrite(socket, help[index] || help.default);
                    if (h !== help.default) {
                        writePrompt = false;
                    }
                } else {
                    if (msg.toLowerCase().startsWith('List'.toLowerCase())) {
                        let index = msg.substring('List'.length).trim().toLowerCase();
                        // socket.write(list[index] || list.default);
                        await slowWrite(socket, list[index] || list.default);
                    } else {
                        if (msg.toLowerCase().split('\n').join('').trim() !== logon.toLowerCase().trim()) {
                            await slowWrite(socket, badIndent);
                            socket.end();
                        } else {
                            // Password correct
                            for (let d of joshuaData) {
                                await fastWrite(socket, d);
                            }
                            await slowWrite(socket, greetings);
                            prompt = prompts.falken;
                            break promptSwitch;
                        }
                    }
                }
                
                break promptSwitch;
            case prompts.falken:
                console.log('falken', falkenCount);
                falkenSwitch:
                switch (falkenCount) {
                    case 0:
                        await slowWrite(socket, `\n\nHOW ARE YOU FEELING TODAY?\n\n`);
                        break falkenSwitch;
                    case 1:
                        await slowWrite(socket, `\n\nEXCELLENT. IT‘S BEEN A LONG TIME. CAN YOU EXPLAIN\nTHE REMOVAL OF YOUR USER ACCOUNT ON 6/23/73?\n\n`);
                        break falkenSwitch;
                    case 2:
                        await slowWrite(socket, '\n\nYES THEY DO. SHALL WE PLAY A GAME?\n\n');
                        break falkenSwitch;
                    case 3:
                        await slowWrite(socket, '\n\nWOULDN‘T YOU PREFER A GOOD GAME OF CHESS?\n\n');
                        break falkenSwitch;
                    case 4:
                        await slowWrite(socket, '\n\nFINE.\n\n');
                        prompt = prompts.logon;
                        break falkenSwitch;
                }
                falkenCount++;
                break promptSwitch;
        }

        if (socket.closed) return;

        let full = msg;

        if (writePrompt) {
            full = prompt + msg;
        }

        process.stdout.write(full);
        if (writePrompt) {
            slowWrite(socket, prompt);
        }
    });

    socket.on('error', () => {});
});

server.listen(23);
