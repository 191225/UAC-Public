import { Player, world } from '@minecraft/server';
import { Server } from '../../../library/Minecraft.js';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui'
import scoreboard from "../../../library/scoreboard.js"
import { tellrawStaff } from '../../../library/utils/prototype.js';
const { for: obj } = scoreboard.objective

const moduleRequires = ['has_xx', 'has_gt']
const moduleDefs = [
    {
        mname: 'AFK Kick',
        obj: ['afkm'],
        name: 'afkdummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Anti-CBE',
        obj: ['ACM', 'acmtoggle'],
        name: 'acmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Anti CLog',
        obj: ['clmtoggle', 'clmtoggle'],
        name: 'clmdummy',
        toggle: ['§cOFF', '§aKILL', '§aCLEAR'],
        require: 'has_xx'
    },
    {
        mname: 'Anti ChatSpam',
        obj: ['acstoggle', 'acstoggle'],
        name: 'acsdummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'Anti-EnderChest',
        obj: ['NEM', 'nemtoggle'],
        name: 'nemtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Anti-Fly',
        obj: ['AFM', 'afmtoggle'],
        name: 'afmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Anti-OP Abuse',
        obj: ['OPAM', 'opamtoggle'],
        name: 'opamtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Anti-Reach',
        obj: ['armtoggle'],
        name: 'armtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Bottom Bedrock',
        obj: ['BBM', 'bbmtoggle'],
        name: 'bbmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Chat Ranks',
        obj: ['chatrank', 'chatrank'],
        name: 'crdummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'Death Toggle',
        obj: ['dethtoggle', 'Deathef'],
        name: 'dethtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Fake Staff Protection',
        obj: ['SSM', 'ssmtoggle'],
        name: 'ssmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Hotbar Message',
        obj: ['HMM', 'hmmtoggle'],
        name: 'hmmtoggledummy',
        toggle: ['§cOFF', '§aWith Score', '§aWithout Score', '§aResourcePack Mode'],
        require: ''
    },
    {
        mname: 'Item Ban',
        obj: ['IBM', 'ibmtoggle'],
        name: 'ibmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Lag Clear',
        obj: ['LTM', 'ltmtoggle'],
        name: 'ltmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Mining Detection',
        obj: ['MDM', 'mdmtoggle'],
        name: 'mdmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Player Command',
        obj: ['ICM', 'icmtoggle'],
        name: 'icmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'Random Spawn',
        obj: ['RSM', 'rsmtoggle'],
        name: 'rsmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Time Played',
        obj: ['TPM', 'tpmtoggle'],
        name: 'tpmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Unobtainable Items',
        obj: ['uoimtoggledummy'],
        name: 'UOIM',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'World Border',
        obj: ['WBM', 'wbmtoggle'],
        name: 'wbmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    }
]
const itembanDefs = [
    { mname: 'Harming Arrow', obj: 'BNA', name: 'BNAdummy' },
    { mname: 'Book and Quill', obj: 'BNBQ', name: 'BNBQdummy' },
    { mname: 'Crossbow', obj: 'BNCB', name: 'BNCBdummy' },
    { mname: 'Maps', obj: 'BNM', name: 'BNMdummy' },
    { mname: 'Shulkerboxes', obj: 'BNSB', name: 'BNSBdummy' },
    { mname: 'TNT', obj: 'BNTN', name: 'BNMTNummy' },
    { mname: 'Trident', obj: 'BNTD', name: 'BNMTDummy'}
]
const oreBanDefs = [
    { mname:'Diamond', obj: 'diamondmd', name: 'mdmtoggledummy' },
    { mname:'Emerald', obj: 'emeraldmd', name: 'mdmtoggledummy' },
    { mname:'Gold', obj: 'goldmd', name: 'mdmtoggledummy' },
    { mname:'Iron', obj: 'ironmd', name: 'mdmtoggledummy' },
    { mname:'Lapis', obj: 'lapizmd', name: 'mdmtoggledummy' },
    { mname:'Netherite', obj: 'scrapmd', name: 'mdmtoggledummy'}
]
const kitDefs = [
    { mname: 'Netherite', structure: 'AdminNether' },
    { mname: 'ULegitNetherite', structure: 'AdminUnbreakableNetherlegit' },
    { mname: 'U32kNetherite', structure: 'AdminUnbreakableNether32k' },
    { mname: 'Diamond', structure: 'AdminDiamond' },
    { mname: 'ULegitDiamond', structure: 'AdminUnbreakableDiamondLegit' },
    { mname: 'U32kDiamond', structure: 'AdminUnbreakableDiamond32k' },
    { mname: 'Iron', structure: 'AdminIron' },
    { mname: 'ULegitIron', structure: 'AdminUnbreakableironlegit' },
    { mname: 'U32kIron', structure: 'AdminUnbreakableiron32k' },
]
const particleDefs = [
    { mname: 'Explode', fn: 'explode' },
    { mname: 'Nether Poof', fn: 'nether_poof_small' },
    { mname: 'Nether Poof Small', fn: 'nether_poof' },
    { mname: 'Totem Poof', fn: 'totem_poof' },
]

/** @type { (plr: Player, module: typeof moduleDefs[number], newValue?: number) => void } */
const setModule = (plr, module, newValue) => {
    try { 
        const objdata = obj(module.obj[0]).dummies
        if (newValue == null) newValue = ( ( objdata.get(module.name) ?? 0 ) + 1 ) % module.toggle.length
        objdata.set(module.name, newValue)
        for (const id of module.obj) obj(id).dummies.set(module.name, newValue)
        tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has set the module §e${module.mname}§b to ${module.toggle[newValue]}`)
    } catch(error) {console.warn(error, error.stack)}
    
}

/** @type { (plr: Player) => 's' | 'c' | 'a' | 'sp' | 'hc' } */
const getGamemode = (plr) => {
    try { plr.runCommand('testfor @s[m=c]'); return 'c' } catch {}
    try { plr.runCommand('testfor @s[m=s]'); return 's' } catch {}
    try { plr.runCommand('testfor @s[m=a]'); return 'a' } catch {}
    return null
}

const guiScheme = {
    /** @type { (plr: Player) => void } */
    main: (() => { // main UI
        /** @type { [name: string, fn: (plr: Player) => void][] } */
        const actionList = [
            [ 'Modules'        , plr => guiScheme.toggle(plr) ],
            [ 'Item bans'      , plr => guiScheme.itemban(plr) ],
            [ 'Ore alerts'     , plr => guiScheme.oreban(plr) ],
            [ 'Kits'           , plr => guiScheme.kits(plr) ],
            [ 'Particles'      , plr => guiScheme.particles(plr) ],
            [ 'World Border'   , plr => guiScheme.worldborder(plr) ],
            [ 'Player Command' , plr => guiScheme.pcmd['new'](plr) ],
            [ 'More'           , plr => guiScheme.more(plr) ],
            [ 'Close'          , plr => {} ],
        ]
        const v = new ActionFormData()
            .title('Unity Anticheat')

        for (let [name, f] of actionList) v.button(name)
        
        return (plr) => void v.show(plr).then(v => {
            if (v.isCanceled) return
            actionList[v.selection][1](plr)
        })
    })(),

    NonStaff: (() => { // UI for non-staff players
        /** @type { [name: string, fn: (plr: Player) => void][] } */
        const cmdlist = [
            [ 'Your Stats'          , plr => guiScheme.pcmd.playerstats(plr) ],
            [ 'Change Display'      , plr => guiScheme.pcmd.display(plr) ],
            [ 'TPA to Player'      , plr => guiScheme.pcmd.tpa_select(plr) ],
            [ 'TP to Spawn'         , plr => guiScheme.pcmd.spawntp(plr) ],
            [ 'Last Death Coords'   , plr => guiScheme.pcmd.lastdeath(plr) ],
            [ 'Close'               , plr => {} ],
        ]
        const v = new ActionFormData()
            .title('Player Command GUI')

        for (let [name, f] of cmdlist) v.button(name)
        
        return (plr) => void v.show(plr).then(v => {
            if (v.isCanceled) return
            cmdlist[v.selection][1](plr)
        })
    })(),

    pcmd: {
        display: (plr) => {
            if (plr.scoreTest('hmmtoggle') >= 1) return plr.tellraw(`§¶§cUAC ► §c§lRealm owner has set a global hotbar message `);
            
            const actionList = [
                [ 'Personal Stats'  , () => plr.runCommand('scoreboard players set @s hometp 1337') ],
                [ 'Server Stats'    , () => plr.runCommand('scoreboard players set @s hometp 420') ],
                [ 'Off'             , () => plr.runCommand('scoreboard players set @s hometp 3') ],
                [ 'back'            , () => guiScheme.NonStaff(plr) ]
            ]

            const v = new ActionFormData()
            .title(`Change Display Message`)

            for (let [name, f] of actionList) v.button(name)


            v.show(plr).then(v => {
                if (v.isCanceled) return
                actionList[v.selection][1]()
            })
        },

        lastdeath: (plr) => {
            plr.runCommand('function UAC/asset/deathcoords_asset')
        },
        spawntp: (plr) => {
            let name = plr.getName();
            if (plr.scoreTest('worldcustom') === 1) {
                plr.runCommand(`tp @s ${plr.scoreTest('Worldx')} ${plr.scoreTest('Worldy')} ${plr.scoreTest('Worldz')}`);
                plr.tellraw(`§¶§cUAC ► §l§d${name} §bHas warped to World Spawn at §6${plr.scoreTest('Worldx')} ${plr.scoreTest('Worldy')} ${plr.scoreTest('Worldz')}`);
                tellrawStaff(`§¶§cUAC ► §d${name} §bwarped to worldspawn`);
                plr.runCommand(`function particle/nether_poof`);
                plr.runCommand(`scoreboard players set @s tp_cooldown 900`);
            }
            else {
                plr.runCommand(`tp @s 0 100 0`)
                plr.runCommand(`effect @s slow_falling 35 1 `);
                tellrawStaff(`§¶§cUAC ► §d${name} §bwarped to worldspawn`);
                plr.runCommand(`function particle/nether_poof`);
                plr.runCommand(`scoreboard players set @s tp_cooldown 900`);
            }
        },

        tpa_select: (plr, _a = 0) => {
            //let name = plr.getName();
            const pl = [...world.getPlayers()].filter(v => v !== plr)
            const v = new ModalFormData()
                .title('Player TPA')
                .textField(
                    (
                        _a == 1 ? '§cPlayer not found.\n§r'
                        : _a == 2 ? '§cCannot target yourself.\n§r'
                        : ''
                    ) + 'Type in the player name. Leave blank to cancel',
                    'Player name'
                )
                .dropdown('Or select a player:', ['§8None§r', ...pl.map(v => v.name)])


            v.show(plr).then(v => {
                const input = v.formValues[0],
                    selection = v.formValues[1]
                    if ((!input && !selection) || v.isCanceled) return guiScheme.NonStaff(plr)
                const inputUnformatted = input.replace(/§./g, '')

                const target =
                    ( !input ? null : [...world.getPlayers()].find( v => v.name == input || v.name.replace(/§./g, '') == inputUnformatted ) )
                    || ( !selection ? null : pl[selection - 1] )
                if (!target) return guiScheme.pcmd.tpa_select(plr, 1)
                if (target == plr) return guiScheme.pcmd.tpa_select(plr, 2)
                guiScheme.pcmd.tpa_request(plr, target)

            })
        },

        tpa_request: (plr, target) => {
            const v = new ActionFormData()
                .title(`${target.name.replace(/§./g, '')}'s TPA options`)

            let text = []
            text.push(`§l§bSend a TPA to §d${target.name.replace(/§./g, '')}§b?`)
            v.body(text.join('\n§r'))
            const cmdlist = [
                [ 'Send Request'             , () => guiScheme.pcmd.tpa_send(plr, target) ],
                [ 'Cancel/Deny Request(s)'   , () => guiScheme.pcmd.tpa_cancel(plr, target) ],
                [ 'Accept Request(s)'        , () => guiScheme.pcmd.tpa_accept(plr, target) ]
            ]

            for (let [name, f] of cmdlist) v.button(name)

            v.show(plr).then(v => {
                if (v.isCanceled) return
                cmdlist[v.selection][1]()
            })
            
        },
        tpa_send: (plr, target) => {
            let name = plr.getName();
            if (plr.scoreTest('tpa') >= 1) 
                return plr.tellraw(`§¶§cUAC ► §bTPA Channel already created! Your Channel §7:§c "${plr.scoreTest('tpa')}" \n§bCancel to create a new request.`);
            

            plr.runCommand(`scoreboard players random @s tpa 1 999999`);
            plr.runCommand(`scoreboard players set @s tp_cooldown 900`);
            plr.runCommand('tag @s add tpatemp');
            plr.runCommand(`scoreboard players operation "${target.getName()}" tpa = "${name}" tpa`);
            target.tellraw(`§¶§cUAC ► §d${name} §bhas sent you a TPA Request. Use §6UAC.tpa accept §bto accept the request`);
            plr.tellraw(`§¶§cUAC ► §d${target.getName()} §bwas sent a TPA Request`);
            tellrawStaff(`§¶§cUAC ► §d${name} §bsent a TPA Request to §d${target.getName()}`);
            
        },
        tpa_cancel: (plr, target) => {
            plr.runCommand(`execute @a[tag=tpatemp,scores={tpa=${plr.scoreTest('tpa')}}] ~~~ tag @s remove tpatemp`);
            plr.runCommand(`scoreboard players set @a[scores={tpa=${plr.scoreTest('tpa')}}] tpa 0`);
            plr.tellraw(` §¶§cUAC ► §bThe TPA request was closed`);
            tellrawStaff(` §¶§cUAC ► §d${plr.getName()} §bclosed a TPA request `);
        },
        tpa_accept: (plr, target) => {
            let name = plr.getName();
            if (plr.scoreTest('tpa') === 0) return plr.tellraw(`§¶§c§lUAC ► §cNo TPA Requests to accept`);
            if (plr.hasTag('tpatemp')) return plr.tellraw(`§¶§c§lUAC ► §cYou have a request open to someone, and cannot accept others.`);

            plr.tellraw(` §¶§cUAC ► §bTPA Request was §2ACCEPTED§7.`);
            tellrawStaff(` §¶§cUAC ► §d${name} §baccepted a TPA request `);
            plr.runCommand(`execute @p[name=!"${name}",scores={tpa=${plr.scoreTest('tpa')}}] ~~~ tp @s "${name}"`);
            plr.runCommand(`scoreboard players set @s tp_cooldown 900`); 
            plr.runCommand(`execute @p[name=!"${name}",scores={tpa=${plr.scoreTest('tpa')}}] ~~~ scoreboard players set @s tp_cooldown 900`);

            plr.runCommand(`execute @p[name=!"${name}",scores={tpa=${plr.scoreTest('tpa')}}] ~~~ playsound note.pling @s ~ ~ ~`);
            plr.runCommand(`execute @p[name=!"${name}",scores={tpa=${plr.scoreTest('tpa')}}] ~~~ function particle/nether_poof`);
            plr.runCommand(`execute @p[name=!"${name}",scores={tpa=${plr.scoreTest('tpa')}}] ~~~ playsound mob.shulker.teleport @s ~~~ 2 2 2`); 

            plr.runCommand(`scoreboard players set @a[scores={tpa=${plr.scoreTest('tpa')}}] tpa 0`);
            plr.runCommand(`execute @a[tag=tpatemp,scores={tpa=${plr.scoreTest('tpa')}}] ~~~ tag @s remove tpatemp`);
        },


        /** @type { (plr: Player, target: Player) => void } */
        stats: (plr, target) => {
            const v = new ActionFormData()
                .title(`${target.name.replace(/§./g, '')}'s stats`)

            let text = []
            
            // location
            text.push('§l§eLocation')
            const plrFacing = obj('Player_Facing').players.get(target) // down up north south west east
            const plrCoord = [ 'X_Coordinate', 'Y_Coordinate','Z_Coordinate' ].map(v => obj(v).players.get(target) )
            const spawnCoord = [ 'X_Coord_S', 'Y_Coord_S', 'Z_Coord_S' ].map(v => obj(v).players.get(target) )
            const deathCoord = [ 'X_Coord_D', 'Y_Coord_D', 'Z_Coord_D' ].map(v => obj(v).players.get(target) )
            const playerDim = (() => {
                const in_nether = obj('in_nether').players.get(target)
                const in_end = obj('in_end').players.get(target)
                return in_nether ? 1 // 1: in nether
                    : in_end ? 2 // 2: in end
                    : 0 // overworld / unknoown
            })()

            text.push(`Location: ${plrCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`SpawnLoc: ${spawnCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`DeathLoc: ${deathCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`Facing: §b${
                plrFacing == 0 ? 'DOWN'
                : plrFacing == 1 ? 'UP'
                : plrFacing == 2 ? 'NORTH'
                : plrFacing == 3 ? 'SOUTH'
                : plrFacing == 4 ? 'WEST'
                : plrFacing == 5 ? 'EAST'
                : 'UNKNOWN'
            }`)
            text.push(`Dimension: §b${
                playerDim == 0 ? 'OVERWORLD'
                : playerDim == 1 ? 'NETHER'
                : playerDim == 2 ? 'END'
                : 'UNKNOWN'
            }`)
            text.push('') // newline

            // permissions
            text.push('§l§ePermissions')
            const isStaff = target.hasTag('staffstatus')
            const isOwner = target.hasTag('ownerstatus')
            const mayFly = obj('2KK001').players.get(plr) == 725
            const isGodmode = target.hasTag('tgmGodMode')
            const gamemode = getGamemode(target)

            text.push(`Staff: ${isStaff ? '§aYes' : '§eNo'}`)
            text.push(`Owner: ${isOwner ? '§aYes' : '§eNo'}`)
            text.push(`Mayfly: ${mayFly ? '§aYes' : '§eNo'}`)
            text.push(`Godmode: ${isGodmode ? '§aYes' : '§eNo'}`)
            text.push(`Gamemode: §b${
                gamemode == 's' ? 'Survival'
                : gamemode == 'c' ? 'Creative'
                : gamemode == 'a' ? 'Adventure'
                : gamemode == 'sp' ? 'Spectator'
                : gamemode == 'hc' ? 'Hardcore'
                : 'Unknown'
            }`)
            text.push('') // newline

            // detections
            /** @type {[id: string, name: string, max: number][]} */
            const detections = [
                ['warn'        , 'Warns'              , 3],
                ['gmc_flag'    , 'GMC flags'          , 4],
                ['warnillegal' , 'Illegal item warns' , 9],
                ['warncbe'     , 'CBE warns'          , 9],
            ]
            text.push('§l§eDetections')
            for (let [id, name, max] of detections) text.push(`${name}:  §e${obj(id).players.get(target) ?? 0}§r / §e${max}§r`)

            text.push('') // newline

            const ores_mined = [
                ['diamond_ore'    , 'Diamonds'      ],
                ['gold_ore'       , 'Gold'          ],
                ['lapis_ore'      , 'Lapis'         ],
                ['ancient_debris' , 'Netherite'     ],
                ['emerald_ore'    , 'Emeralds'      ],
                ['iron_ore'       , 'Iron'          ],
            ]
            text.push('§l§eOres Mined')
            for (let [id, name] of ores_mined) text.push(`${name}:  §e${obj(id).players.get(target) ?? 0}§r`)

            v.body(text.join('\n§r'))
            v.button('Back')

            v.show(plr).then(evd => guiScheme.pcmd.exec(plr, target))
        },
        inv: (plr, target) => {
            const v = new ActionFormData()
                .title(`${target.name.replace(/§./g, '')}'s Items`)

            let text = []
            let head_type = undefined;
            let chest_type = undefined;
            let leg_type = undefined;
            let boot_type = undefined;
            let head_enchanted = target.scoreTest('headen');
            let chest_enchanted = target.scoreTest('chesten');
            let leg_enchanted = target.scoreTest('legen');
            let boot_enchanted = target.scoreTest('feeten');

            if(target.scoreTest('nethhelm')) { head_type = 'Netherite' }
            if(target.scoreTest('diahelm')) { head_type = 'Diamond' }
            if(target.scoreTest('ironhelm')) { head_type = 'Iron' }
            if(target.scoreTest('goldhelm')) { head_type = 'Gold' }
            if(target.scoreTest('chainhelm')) { head_type = 'Chainmail' }
            if(target.scoreTest('leathhelm')) { head_type = 'Leather' }
            if(target.scoreTest('turthelm')) { head_type = 'Turtle' }
            if(head_type == undefined) { head_type = 'None'}

            if(target.scoreTest('nethchest')) { chest_type = 'Netherite' }
            if(target.scoreTest('diachest')) { chest_type = 'Diamond' }
            if(target.scoreTest('goldchest')) { chest_type = 'Gold' }
            if(target.scoreTest('ironchest')) { chest_type = 'Iron' }
            if(target.scoreTest('chainchest')) { chest_type = 'Chain' }
            if(target.scoreTest('leathchest')) { chest_type = 'Leather' }
            if(target.scoreTest('elytra')) { chest_type = 'Elytra' }
            if(chest_type == undefined) { chest_type = 'None'}

            if(target.scoreTest('nethlegs')) { leg_type = 'Netherite' }
            if(target.scoreTest('dialegs')) { leg_type = 'Diamond' }
            if(target.scoreTest('ironlegs')) { leg_type = 'Iron' }
            if(target.scoreTest('goldlegs')) { leg_type = 'Gold' }
            if(target.scoreTest('chainlegs')) { leg_type = 'Chain' }
            if(target.scoreTest('leathlegs')) { leg_type = 'Leather' }
            if(leg_type == undefined) { leg_type = 'None'}

            if(target.scoreTest('nethboots')) { boot_type = 'Netherite' }
            if(target.scoreTest('diaboots')) { boot_type = 'Diamond' }
            if(target.scoreTest('ironboots')) { boot_type = 'Iron' }
            if(target.scoreTest('goldboots')) { boot_type = 'Gold' }
            if(target.scoreTest('chainboots')) { boot_type = 'Chain' }
            if(target.scoreTest('leathboots')) { boot_type = 'Leather' }
            if(boot_type == undefined) { boot_type = 'None'}
            

            // Armor
            text.push(`§d§l${target.getName()}'s §bArmor §7:`);
            text.push(`§b§lHelmet §7: §c${head_type} §bEnchant §7: ${head_enchanted ? '§2TRUE' : '§cFALSE'}`);
            text.push(`§b§lChest §7: §c${chest_type} §bEnchant §7: ${chest_enchanted ? '§2TRUE' : '§cFALSE'}`);
            text.push(`§b§lLegs §7: §c${leg_type} §bEnchant §7: ${leg_enchanted ? '§2TRUE' : '§cFALSE'}`);
            text.push(`§b§lBoots §7: §c${boot_type} §bEnchant §7: ${boot_enchanted ? '§2TRUE' : '§cFALSE'}`);

            text.push(` `) // new line
            let items = target.getInventory(true);
            text.push(
                `§¶§d§l${target.getName()} §binventory:\n${items
                    .map(({ slot, id, amount, data }) => `§¶§6§lslot: §¶§c${slot} §¶§6§lid: §¶§c${id.replace('minecraft:', '')} §¶§6§lamount: §¶§c${amount} §¶§6§ldata: §¶§c${data}`)
                    .join('\n')}`);

            v.body(text.join('\n§r'))
            v.button('Back')

            v.show(plr).then(evd => guiScheme.pcmd.exec(plr, target))
        },

        playerstats: (plr, target) => { // Non-staff stats UI
            const v = new ActionFormData()
            .title(`${plr.name.replace(/§./g, '')}'s Stats`)

            let text = [];
            let tp_day = plr.scoreTest('timeplayedday');
            let tp_hour = plr.scoreTest('timeplayedhr');
            let tp_min = plr.scoreTest('timeplayedmin');
            let tp_sec = plr.scoreTest('timeplayedsec');

            let deaths = plr.scoreTest('deaths');
            let kills = plr.scoreTest('kills');
            let killstreak = plr.scoreTest('killstreak');
            let money = plr.scoreTest('money');

            let diamonds = plr.scoreTest('diamond_ore');
            let emeralds = plr.scoreTest('emerald_ore');
            let gold = plr.scoreTest('gold_ore');
            let iron = plr.scoreTest('iron_ore');
            let lapis = plr.scoreTest('lapis_ore');
            let netherite = plr.scoreTest('ancient_debris');

            text.push(`§d§lTime Played:`);
            text.push(`§bD/§7:§c${tp_day} §bH/§7:§c${tp_hour} §bM/§7:§c${tp_min} §bS/§7:§c${tp_sec}`);
            text.push(` `) // new line
            text.push(`§d§lCombat:`);
            text.push(`§bKills §7:§c${kills} §bDeaths §7:§c${deaths} §bKillstreak §7:§c${killstreak}`);
            text.push(` `) // new line
            text.push(`§d§lBlocks Mined:`);
            text.push(`§bDimaonds §7:§c${diamonds} §bEmeralds §7:§c${emeralds} §bGold §7:§c${gold}`);
            text.push(`§bIron §7:§c${iron} §bLapis §7:§c${lapis} §bNetherite §7:§c${netherite}`);
            text.push(` `) // new line
            text.push(`§bCurrent Ballance §7: §c${money}`) 

            v.body(text.join('\n§r'))
            v.button('Back')

            v.show(plr).then(evd => guiScheme.NonStaff(plr, target))

        },

        /** @type { (plr: Player, target: Player) => void } */
        exec: (plr, target) => { // Player command UI (exec)
            /** @type { [name: string, fn: () => void][] } */
            const actionList = [
                [ 'Stats'        , () => guiScheme.pcmd.stats(plr, target) ],
                [ 'Inventory'    , () => guiScheme.pcmd.inv(plr, target) ],
                [ 'TP to Me'     , () => plr.runCommand(`tp "${target.name.replace(/\\|"/g, '\\$&')}" @s`) ],
                [ 'TP to Them'   , () => plr.runCommand(`tp "${plr.name.replace(/\\|"/g, '\\$&')}" "${target.name.replace(/\\|"/g, '\\$&')}"`) ],
                [ 'Punish'       , () => target.runCommand('function UAC/punish') ],
                [ 'Freeze'       , () => target.runCommand('function UAC/freeze_player') ],
                [ 'Warn'         , () => target.runCommand('function UAC/warn') ],
                [ 'E-Chest Wipe' , () => target.runCommand('function UAC/echestwipe') ],
                [ 'Reset Warn'   , () => target.runCommand('function UAC/warnreset') ],
                [ 'Ban'          , () => target.runCommand('tag @s add Ban') ],
                [ 'Smite'        , () => target.runCommand('function UAC/smite') ],
            ]

            const v = new ActionFormData()
                .title(`Player Command - ${target.name.replace(/§./g, '')}`)

            for (let [name, f] of actionList) v.button(name)

            v.show(plr).then(v => {
                if (v.isCanceled) return
                actionList[v.selection][1]()
            })
        },

        /** @type { (plr: Player, _a?: number) => void } */
        new: (plr, _a = 0) => { // Player command UI
            const pl = [...world.getPlayers()].filter(v => v !== plr)

            const v = new ModalFormData()
                .title('Player Command')
                .textField(
                    (
                        _a == 1 ? '§cPlayer not found.\n§r'
                        : _a == 2 ? '§cCannot target yourself.\n§r'
                        : ''
                    ) + 'Type in the player name. Leave blank to cancel',
                    'Player name'
                )
                .dropdown('Or select a player:', ['§8None§r', ...pl.map(v => v.name)])

            v.show(plr).then(v => {
                /** @type {string} */
                const input = v.formValues[0],
                    selection = v.formValues[1]
                if ((!input && !selection) || v.isCanceled) return guiScheme.main(plr)
                const inputUnformatted = input.replace(/§./g, '')
                const target =
                    ( !input ? null : [...world.getPlayers()].find( v => v.name == input || v.name.replace(/§./g, '') == inputUnformatted ) )
                    || ( !selection ? null : pl[selection - 1] )
                if (!target) return guiScheme.pcmd.new(plr, 1)
                if (target == plr) return guiScheme.pcmd.new(plr, 2)
                guiScheme.pcmd.exec(plr, target)
            })
        }
    },

    /** @type { (plr: Player) => void } */
    more: (() => { // more UI
        /** @type { [name: string, fn: (plr: Player) => void][] } */
        const actionList = [
            // [ 'Clear Area'     , plr => plr.runCommand('function UAC/cleararea') ],
            [ 'Clear chat'     , plr => plr.runCommand('function UAC/clearchat') ],
            [ 'Clear lag'      , plr => plr.runCommand('function UAC/lagclear') ],
            [ 'Vanish'         , plr => plr.runCommand('function UAC/vanish') ],
            [ 'Auto Totem'     , plr => plr.runCommand('function UAC/autototem') ],
            [ 'Godmode'        , plr => plr.runCommand('function UAC/tgm') ],
            [ 'Fake Leave'     , plr => plr.runCommand('function UAC/fakeleave') ],
            [ 'Credits'        , plr => plr.runCommand('function UAC/credit') ],
            [ 'Back'           , plr => guiScheme.main(plr) ],
        ]

        const v = new ActionFormData()
            .title('Unity Anticheat')

        for (let [name, f] of actionList) v.button(name)

        return (plr) => void v.show(plr).then(v => {
            if (v.isCanceled) return
            actionList[v.selection][1](plr)
        })
    })(),

    /** @type { (plr: Player) => void } */
    toggle: (plr) => { // module toggle UI
        const v = new ModalFormData()
            .title('Modules')

        /** @type { number[] } */
        const values = []

        const exps = Object.fromEntries( moduleRequires.map(v => [ v, obj(v).players.get(plr) ]) )
        for (let module of moduleDefs) {
            const vl = obj(module.obj[0]).dummies.get(module.name)
            values.push(vl)
            module.toggle.length == 2
                ? v.toggle(`${module.mname} ${ module.require ? ( exps[module.require] ? '§a' : '§c' ) : '§8' }[EXP]`, !!vl)
                : v.dropdown(`${module.mname} ${ module.require ? ( exps[module.require] ? '§a' : '§c' ) : '§8' }[EXP]`, module.toggle, vl)
        }

        v.show(plr).then(v => {
            if (v.isCanceled) return guiScheme.main(plr)
            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) setModule(plr, moduleDefs[i], b)
            }
            guiScheme.main(plr)
        })
    },

    /** @type { (plr: Player) => void } */
    itemban: (plr) => { // itemban UI
        const v = new ModalFormData()
            .title('Item Bans')

        /** @type { number[] } */
        const values = []
        
        for (let itemban of itembanDefs) {
            const vl = obj(itemban.obj).dummies.get(itemban.name)
            values.push(vl)
            v.toggle(itemban.mname, !!vl)
        }

        v.show(plr).then(v => {
            if (v.isCanceled) return guiScheme.main(plr)

            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) {
                    const itemban = itembanDefs[i]
                    let objdata = obj(itemban.obj).dummies
                    objdata.set(itemban.name, b)
                    tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has ${b ? '§aenabled' : '§cdisabled'}§r §eItemBan/${itemban.mname}§r`)
                }
            }

            guiScheme.main(plr)
        })
    },

    /** @type { (plr: Player) => void } */
    oreban: (plr) => { // orealert UI
        const v = new ModalFormData()
            .title('Ore Alerts')
    
        /** @type { number[] } */
        const values = []
        
        for (let oreban of oreBanDefs) {
            const vl = obj(oreban.obj).dummies.get(oreban.name)
            values.push(vl)
            v.toggle(oreban.mname, !!vl)
        }

        v.show(plr).then(v => {
            if (v.isCanceled) return guiScheme.main(plr)

            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) {
                    const oreban = oreBanDefs[i]
                    let objdata = obj(oreban.obj).dummies
                    objdata.set(oreban.name, b)
                    tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has ${b ? '§aenabled' : '§cdisabled'}§r §eOreAlert/${oreban.mname}§r`)
                }
            }

            guiScheme.main(plr)
        })
    },

    particles: (() => { // particles
        const v = new ActionFormData()
            .title('Particles')
        
        for (let particle of particleDefs) v.button(particle.mname)
        v.button('Back')

        /** @type { (plr: Player) => void } */
        return (plr) => {
            v.show(plr).then(v => {
                if (v.isCanceled || v.selection == particleDefs.length) return guiScheme.main(plr)

                const particle = particleDefs[v.selection]
                plr.runCommand(`function particle/${particle.fn}`)
            })
        }
    })(),

    kits: (() => { // kits UI
        const v = new ActionFormData()
            .title('Kits')
        
        for (let kit of kitDefs) v.button(kit.mname)
        v.button('Back')
        
        /** @type { (plr: Player) => void } */
        return (plr) => {
            v.show(plr).then(v => {
                if (v.isCanceled || v.selection == kitDefs.length) return guiScheme.main(plr)

                const kit = kitDefs[v.selection]
                plr.runCommand(`structure load "${kit.structure}" ~~~`)
                tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has spawned a kit §e${kit.mname}§r`)
            })
        }
    })(),

    wbchange: (() => { // worldborder change UI
        const v = new ModalFormData()
            .title('World Border')
            .textField('Enter a new world border distance. Leave blank to cancel', 'World border distance (number)')
        
        /** @type { (plr: Player) => void } */
        return (plr) => void v.show(plr).then(v => {
            if (v.isCanceled || !v.formValues[0]) return guiScheme.worldborder(plr)

            let newValue = Number(v.formValues[0])
            if (isNaN(newValue)) return guiScheme.worldborder(plr)

            obj('Border_Coord_X').dummies.set('BDXdummy', newValue)
            obj('Border_Coord_Z').dummies.set('BDXdummy', newValue)
            tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has set the world border size to §a${newValue}§b/§a${newValue}§r`)

            guiScheme.worldborder(plr)
        })
    })(),

    /** @type { (plr: Player) => void } */
    worldborder: (plr) => { // worldborder UI
        const status = obj('WBM').dummies.get('wbmtoggledummy'),
            currentX = obj('Border_Coord_X').dummies.get('BDXdummy'),
            currentZ = obj('Border_Coord_Z').dummies.get('BDXdummy')
        
        let v = new ActionFormData()
            .title('World Border')
            .body([
                `Status: ${status ? '§aENABLED' : '§cDISABLED'}§r`,
                `Current distance: §a${currentX}§r / §a${currentZ}§r`
            ].join('\n'))
            .button('Change distance')
            .button('Change toggle')
            .button('Back')
        
        v.show(plr).then(v => {
            if (v.isCanceled || v.selection == moduleDefs.length) return guiScheme.main(plr)
            switch (v.selection) {
                case 0: return guiScheme.wbchange(plr)
                case 1: {
                    /** @type { typeof moduleDefs[number] } */
                    const module = {
                        mname: 'World Border',
                        obj: ['WBM', 'wbmtoggle'],
                        name: 'wbmtoggledummy',
                        toggle: ['§cOFF', '§aON'],
                        require: 'has_xx'
                    }
                    setModule(plr, module)

                    return guiScheme.worldborder(plr)
                }
                case 2: return guiScheme.main(plr)
            }
        })
    }
}

const registerInformation = {
    cancelMessage: true,
    name: 'gui',
    staff: 'false',
    description: 'Open Interactable GUI for ease of use',
    usage: '[ gui ]',
    example: [
        'gui'
    ]
};

/** @type { Map<Player, [x:number,y:number,z:number]> } */
const waitMove = new Map()

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg, {location: {x, y, z}} = sender
    if(sender.scoreTest('icmtoggle') === 0 && !sender.hasTag('staffstatus')) return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
    //if (!sender.hasTag('staffstatus')) return sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can use this command`)
    sender.tellraw(`§aMove to show the UI.`)
    waitMove.set(chatmsg.sender, [x, y, z])
})

world.events.tick.subscribe(() => {
    for (let [plr, [x, y, z]] of waitMove) {
        try {
            let { x: xc, y: yc, z: zc } = plr.location
            if (x != xc || y != yc || z != zc) {
                if(plr.hasTag('staffstatus')) {
                    guiScheme.main(plr)
                    waitMove.delete(plr)
                } else {
                    guiScheme.NonStaff(plr)
                    waitMove.delete(plr)
                }
            }
        } catch {
            waitMove.delete(plr)
        }
    }
})
