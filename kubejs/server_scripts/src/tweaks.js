// priority: 0

let bad_knives = [
    "refurbished_furniture:knife",
    "aquaculture:wooden_fillet_knife",
    "aquaculture:stone_fillet_knife",
    "aquaculture:iron_fillet_knife",
    "aquaculture:gold_fillet_knife",
    "aquaculture:diamond_fillet_knife",
    "aquaculture:neptunium_fillet_knife"
]

let doughs = [
    "create:dough",
    "farmersdelight:wheat_dough",
    "vintagedelight:oat_dough",
    "refurbished_furniture:dough"
]

let random = [
    "trials:crafter",
    "refurbished_furniture:wrench",
    "refurbished_furniture:wheat_flour",
    "refurbished_furniture:cheese",
    "refurbished_furniture:cheese_sandwich",
    "refurbished_furniture:sea_salt",
    "refurbished_furniture:sweet_berry_jam",
    "refurbished_furniture:glow_berry_jam",
    "refurbished_furniture:raw_vegetable_pizza",
    "refurbished_furniture:cooked_vegetable_pizza",
    "refurbished_furniture:vegetable_pizza_slice",
    "refurbished_furniture:raw_meatlovers_pizza",
    "refurbished_furniture:cooked_meatlovers_pizza",
    "refurbished_furniture:meatlovers_pizza_slice",
    "refurbished_furniture:light_stove",
    "refurbished_furniture:dark_stove",
    "refurbished_furniture:frying_pan",
    "create:cart_assembler",
    "create:andesite_scaffolding",
    "create:copper_scaffolding",
    "create:brass_scaffolding",
    "naturalist:cooked_egg",
    "naturalist:cooked_catfish",
    "naturalist:cooked_bass",
    "ends_delight:chorus_fruit_grain",
    "farmersdelight:milk_bottle",
    "supplementaries:flax",
    "supplementaries:flax_seeds",
    "mynethersdelight:slices_of_bread",
    "mynethersdelight:toasts",
    "mynethersdelight:bread_loaf",
    "mynethersdelight:ghast_sourdough",
    "simpleshops:simple_shop"
]

let random_recipe = [
    "minecraft:bread",
    "create:smelting/bread",
    "create:smoking/bread",
    "vintagedelight:bread_from_smoking",
    "vintagedelight:bread_from_smelting",
    "minecraft:cookie",
    "quark:tweaks/crafting/utility/bent/bread",
    "quark:tweaks/crafting/utility/bent/cookie",
    "minecraft:cake",
    "naturalist:cake",
    "farmersdelight:cake_from_milk_bottle",
    "create:crafting/curiosities/cake",
    "refurbished_furniture:frying/cheese_toastie",
    "mynethersdelight:cutting/ghast_dough"
]

let bad_enchants = [
    "ensorcellation:cavalier",
    "ensorcellation:damage_ender",
    "ensorcellation:damage_villager",
    "ensorcellation:displacement",
    "ensorcellation:fire_rebuke",
    "ensorcellation:frost_rebuke",
    "ensorcellation:gourmand",
    "ensorcellation:instigating",
    "ensorcellation:magic_edge",
    "ensorcellation:pilfering"
]

let op_loot_tables = [
    "apotheosis:chests/chest_valuable",
    "apotheosis:chests/spawner_brutal",
    "apotheosis:chests/spawner_brutal_rotate",
    "apotheosis:chests/spawner_swarm",
    "apotheosis:chests/tome_tower"
]

ServerEvents.recipes(e => {
    for (let knife of bad_knives) e.remove({output: knife})
    for (let dough of doughs) e.remove({output: dough})
    for (let rand of random) e.remove({output: rand})

    for (let recipe of random_recipe) {
        e.remove({id: recipe})
    }

    e.replaceInput({}, "ends_delight:chorus_fruit_grain", "minecraft:chorus_fruit")

    e.replaceInput({}, "farmersdelight:wheat_dough", "#forge:dough")
    e.replaceInput({}, "create:dough", "#forge:dough")
    e.replaceInput({}, "create:wheat_flour", "#forge:flour")
    //e.replaceInput({}, "minecraft:wheat", "#forge:flour")

    e.replaceInput({id: "mynethersdelight:crafting/golden_egg"}, "mynethersdelight:boiled_egg", "#forge:cooked_eggs")

    e.replaceInput({}, "minecraft:chest", "#forge:chests/wooden")
    e.shaped("simpleshops:simple_shop", [
        " I ",
        "PPP",
        "PCP"
    ], {
        "I": "minecraft:iron_ingot",
        "P": "#minecraft:planks",
        "C": "#forge:chests/wooden",
    })

    e.shapeless("minecraft:bread", [
        "minecraft:wheat",
        "minecraft:wheat",
        "minecraft:wheat"
    ])
    e.shapeless(Item.of("minecraft:cookie").withCount(8), [
        "minecraft:cocoa_beans",
        "minecraft:wheat",
        "minecraft:wheat"
    ])
    for (let cookie of [
        ["minecraft:cookie", "neapolitan:chocolate_bar"],
        ["farmersdelight:sweet_berry_cookie", "minecraft:sweet_berries"],
        ["farmersdelight:honey_cookie", "minecraft:honey_bottle"],
        ["ends_delight:chorus_cookie", "minecraft:chorus_fruit"]
    ]) {
        e.shapeless(Item.of(cookie[0]).withCount(12), [
            "#forge:dough", cookie[1]
        ])
    }

    e.remove({id: /neapolitan:.*_cake/})
    e.shaped("minecraft:cake", [
        "MMM",
        "SES",
        " D "
    ], {
        "M": "#forge:milk",
        "S": "minecraft:sugar",
        "E": "#c:eggs",
        "D": "#forge:dough"
    })
    for (let cake of [
        ["neapolitan:vanilla_cake", "neapolitan:dried_vanilla_pods"],
        ["neapolitan:chocolate_cake", "neapolitan:chocolate_bar"],
        ["neapolitan:strawberry_cake", "neapolitan:strawberries"],
        ["neapolitan:banana_cake", "neapolitan:banana"],
        ["neapolitan:mint_cake", "neapolitan:mint_leaves"],
        ["neapolitan:adzuki_cake", "neapolitan:roasted_adzuki_beans"]
    ]) {
        e.shaped(cake[0], [
            "MMM",
            "SES",
            "FDF"
        ], {
            "M": "#forge:milk",
            "S": "minecraft:sugar",
            "E": "#c:eggs",
            "D": "#forge:dough",
            "F": cake[1]
        })
    }

    e.shaped("refurbished_furniture:cheese_sandwich", [
        "B", "C", "B"
    ], {
        "B": "refurbished_furniture:bread_slice",
        "C": "vintagedelight:cheese_slice"
    })

    e.remove({id: /refurbished_furniture:baking.*/})
    e.remove({id: /refurbished_furniture:heating.*/})
    e.remove({id: /refurbished_furniture:slicing.*/})
    e.remove({id: /refurbished_furniture:combining.*/})
    e.remove({id: /refurbished_furniture:.*cutting_board/})

    e.replaceInput({}, "refurbished_furniture:sweet_berry_jam", "vintagedelight:sweet_berry_jam_bottle")
    e.replaceInput({}, "refurbished_furniture:glow_berry_jam", "vintagedelight:glow_berry_jam_bottle")
    e.campfireCooking("refurbished_furniture:toast", "refurbished_furniture:bread_slice", 0, 400)
    e.campfireCooking("refurbished_furniture:cheese_toastie", "refurbished_furniture:cheese_sandwich", 0, 400)

    e.forEachRecipe({type: 'minecraft:campfire_cooking'}, r => {
        let data = JSON.parse(r.json.toString())
        e.custom({
            type: "refurbished_furniture:microwave_heating",
            category: data.category || "food",
            ingredient: data.ingredient,
            result: data.result,
            time: data.cookingtime
        })
    })

    for (let scaffold of [
        ["create:andesite_alloy", "create:andesite_scaffolding"],
        ["minecraft:copper_ingot", "create:copper_scaffolding"],
        ["create:brass_ingot", "create:brass_scaffolding"]
    ]) {
        e.shapeless(Item.of(scaffold[1]).withCount(2), [
            "minecraft:scaffolding",
            "minecraft:scaffolding",
            scaffold[0]
        ])
    }

    for (let fdough of [
        ["create:wheat_flour", "farmersdelight:wheat_dough"],
        ["kubejs:rice_flour", "kubejs:rice_dough"],
        ["vintagedelight:raw_oats", "vintagedelight:oat_dough"]
    ]) {
        e.shapeless(fdough[1], [
            "minecraft:water_bucket",
            fdough[0],
            "vintagedelight:salt_dust"
        ]).keepIngredient("minecraft:water_bucket")
        e.shapeless(Item.of(fdough[1]).withCount(2), [
            "minecraft:egg",
            fdough[0],
            "vintagedelight:salt_dust"
        ])
    }

    e.shaped(Item.of("minecraft:spawner").withNBT({"PlayerMade": 1}), [
        "FFF",
        "FRF",
        "FFF"
    ], {
        "F": "kubejs:spawner_fragment",
        "R": "quark:blaze_lantern"
    })

    for (let data of [
        ["minecraft:iron_ingot", "minecraft:iron_horse_armor"],
        ["minecraft:gold_ingot", "minecraft:golden_horse_armor"],
        ["minecraft:diamond", "minecraft:diamond_horse_armor"]
    ]) {
        e.shaped(data[1], [
            "I I",
            "III",
            "I I"
        ], {
            "I": data[0]
        })
    }
    e.remove({id: /apotheosis:salvaging\/.*?horse/})
    e.remove({id: /create:crushing\/.*?horse/})

    for (let piece of [
        ["minecraft:sand", "kubejs:sand_particle"]
    ]) {
        e.shaped(piece[0], [
            "SSS",
            "SSS",
            "SSS"
        ], {
            "S": piece[1]
        })
        e.shapeless(Item.of(piece[1]).withCount(9), [
            piece[0]
        ])
    }

    e.shapeless("kubejs:heart_of_the_elements", [
        "minecraft:heart_of_the_sea",
        "kubejs:heart_of_the_flame",
        "kubejs:heart_of_the_void",
        "kubejs:heart_of_the_frost",
        "kubejs:heart_of_the_air",
        "kubejs:heart_of_the_earth",
        "kubejs:heart_of_the_sand",
        "kubejs:heart_of_the_jungle",
        "kubejs:heart_of_the_cards"
    ])

    e.shapeless("kubejs:pebble_of_the_earth", [
        "minecraft:netherite_ingot",
        "minecraft:diamond_block",
        "minecraft:gold_block",
        "minecraft:redstone_block",
        "minecraft:iron_block",
        "minecraft:copper_block",
        "minecraft:coal_block",
        "minecraft:stone",
        "minecraft:dirt"
    ])
    e.shaped("kubejs:chunk_of_the_earth", [
        "PPP",
        "PPP",
        "PPP"
    ], {
        "P": "kubejs:pebble_of_the_earth"
    })
    e.shaped("kubejs:heart_of_the_earth", [
        "PPP",
        "PPP",
        "PPP"
    ], {
        "P": "kubejs:chunk_of_the_earth"
    })

    for (let [juice, item, shape] of [
        ["kubejs:apple_juice", "minecraft:apple", "IISB"],
        ["kubejs:sweet_berry_juice", "minecraft:sweet_berries", "IISB"],
        ["kubejs:glow_berry_juice", "minecraft:glow_berries", "IISB"],
        ["kubejs:golden_apple_juice", "minecraft:golden_apple", "IISB"],
        ["kubejs:enchanted_golden_apple_juice", "minecraft:enchanted_golden_apple", "ISB"],
    ]) {
        let items = []
        for (let letter of shape) {
            switch (letter) {
                case "I": items.push(item); continue
                case "S": items.push("minecraft:sugar"); continue
                case "B": items.push("minecraft:glass_bottle"); continue
            }
        }
        e.shapeless(juice, items)
    }
    e.shapeless("kubejs:pumpkin_juice", [
        "farmersdelight:apple_cider",
        "farmersdelight:pumpkin_slice",
        "minecraft:glass_bottle",
        "farmersdelight:pumpkin_slice",
        "farmersdelight:pumpkin_slice",
        "minecraft:sugar"
    ])
    e.shapeless("kubejs:fruit_punch", [
        "kubejs:apple_juice",
        "kubejs:sweet_berry_juice",
        "minecraft:glass_bottle",
        "kubejs:glow_berry_juice",
        "farmersdelight:melon_juice"
    ])


    e.remove({input: "vintagedelight:cucumber", type: "farmersdelight:cutting"})
    for (let cutting of [
        ["minecraft:bread", "refurbished_furniture:bread_slice", 5],
        ["minecraft:feather", "minecraft:string", 1],
        ["minecraft:honeycomb_block", "minecraft:honeycomb", 4],
        ["minecraft:mangrove_roots", "minecraft:stick", 8],
        ["minecraft:cobweb", "minecraft:string", 2],
        ["minecraft:dead_bush", "minecraft:stick", 2],
        ["minecraft:glow_berries", "minecraft:orange_dye", 1],
        ["minecraft:sweet_berries", "minecraft:red_dye", 1],
        ["minecraft:spore_blossom", "minecraft:pink_dye", 1],
        ["minecraft:rotten_flesh", "minecraft:brown_dye", 1],
        ["vintagedelight:cucumber", "vintagedelight:cucumber_noodles", 1]
    ]) {
        e.custom({
            type: "farmersdelight:cutting",
            ingredients: [{item: cutting[0]}],
            result: [{count: cutting[2], item: cutting[1]}],
            tool: {tag: "forge:tools/knives"}
        })
    }
    e.custom({
        type: "farmersdelight:cutting",
        ingredients: [{tag: "forge:seed_grass"}],
        result: [{item: "minecraft:wheat_seeds"}],
        tool: {tag: "forge:tools/knives"}
    })

    // Stack of Paper - 9 paper crafted together
    e.shaped("kubejs:stack_of_paper", [
        "PPP",
        "PPP",
        "PPP"
    ], {
        "P": "minecraft:paper"
    })

    for (const [id, dye] of [
        [0, "minecraft:blue_dye"],
        [1, "minecraft:red_dye"],
        [2, "minecraft:black_dye"],
        [3, "minecraft:pink_dye"]
    ]) {
        e.shapeless(Item.of("playingcards:card_deck").withNBT({SkinID: id}), [
            "kubejs:stack_of_paper",
            "kubejs:stack_of_paper",
            "minecraft:diamond",
            "minecraft:red_dye",
            "minecraft:black_dye",
            dye
        ])
    }
})

ServerEvents.tags("item", e => {
    e.remove("farmersdelight:drinks",
        "abnormals_delight:cherry_cream_soda",
        "abnormals_delight:passion_aloe_nectar",
        "abnormals_delight:pickerelweed_juice",
        "farmersdelight:milk_bottle"
    )
    e.add("farmersdelight:drinks",
        "ends_delight:chorus_fruit_milk_tea",
        "ends_delight:chorus_flower_tea",
        "ends_delight:chorus_fruit_wine"
    )
    e.add("create:upright_on_belt",
        "ends_delight:chorus_fruit_milk_tea",
        "ends_delight:chorus_flower_tea",
        "ends_delight:chorus_fruit_wine"
    )

    e.remove("forge:milk", "farmersdelight:milk_bottle")

    e.remove("supplementaries:ropes", "quark:rope", "farmersdelight:rope")
    for (let knife of bad_knives) e.remove("forge:tools/knives", knife)

    e.remove("forge:bread", "mynethersdelight:slices_of_bread", "mynethersdelight:toasts")
    e.remove("forge:dough", "create:dough")
    e.add("forge:dough", "vintagedelight:oat_dough", "kubejs:rice_dough")

    e.add("forge:grain", "vintagedelight:oat")

    e.add("forge:flour", [
        "create:wheat_flour",
        "kubejs:rice_flour"
    ])

    e.add("forge:grain_or_flour", "#forge:grain", "#forge:flour")

    e.add("forge:seed_grass",
        "minecraft:grass", "minecraft:tall_grass",
        "minecraft:fern", "minecraft:large_fern"
    )
    e.add("forge:tools/knives", "tetra:modular_sword")
})

ItemEvents.rightClicked("kubejs:heart_of_the_elements", e => {
    if (!e.player) return;
    if (e.player.isCreative()) {
        e.server.runCommand("gamemode survival " + e.player.name.getString())
    } else {
        e.server.runCommand("gamemode creative " + e.player.name.getString())
    }
})
ItemEvents.rightClicked("kubejs:heart_of_the_earth", e => {
    if (!e.player) return;
    e.server.runCommandSilent("give " + e.player.name.getString() + " dirt")
})
ItemEvents.rightClicked("kubejs:heart_of_the_sand", e => {
    if (!e.player) return;
    e.server.runCommandSilent("give " + e.player.name.getString() + " kubejs:sand_particle")
})
ItemEvents.rightClicked("kubejs:heart_of_the_cards", e => {
    if (!e.player) return;
    const result = e.server.runCommandSilent("effect clear " + e.player.name.getString() + " minecraft:invisibility");
    if (result <= 0) {
        e.server.runCommandSilent("effect give " + e.player.name.getString() + " minecraft:invisibility infinite 0 true")
    }
})
let last_usage = 0;
ItemEvents.rightClicked("kubejs:heart_of_the_void", e => {
    if (!e.player) return;
    if (String(e.target.type) == "BLOCK") {
        if (e.target.block.id == "minecraft:bedrock") {
            if (e.level.time - last_usage > 30*20) {
                last_usage = e.level.time
                e.target.block.set("minecraft:air")
                console.log(`playsound minecraft:entity.enderman.teleport block @a ${e.target.hitX} ${e.target.hitY} ${e.target.hitZ} 10 1.5`)
                e.server.runCommandSilent(`playsound minecraft:entity.enderman.teleport block @a ${e.target.hitX} ${e.target.hitY} ${e.target.hitZ} 10 1.5`)
            } else {
                e.server.runCommandSilent(`playsound minecraft:entity.enderman.scream block @a ${e.target.hitX} ${e.target.hitY} ${e.target.hitZ} 10 1.5`)
            }
        }
    }
})

LootJS.modifiers(e => {
    e.addLootTableModifier(/aquaculture:.*/)
        .removeLoot("aquaculture:wooden_fillet_knife")
        .replaceLoot("aquaculture:iron_fillet_knife", "farmersdelight:iron_knife")
        .replaceLoot("aquaculture:gold_fillet_knife", "farmersdelight:gold_knife")
        .replaceLoot("aquaculture:diamond_fillet_knife", "farmersdelight:diamond_knife")
        .replaceLoot("aquaculture:neptunium_fillet_knife", "aquaculturedelight:neptunium_knife")

    let mod = e.addLootTableModifier(/apotheosis:chests\/.*/)
    let items = [
        "helmet", "chestplate", "leggings", "boots",
        "shovel", "pickaxe", "axe", "hoe", "sword"
    ]
    for (let item in items) {
        mod = mod
            .replaceLoot("minecraft:diamond_"+item, "minecraft:iron_"+item)
            .replaceLoot("minecraft:netherite_"+item, "minecraft:diamond_"+item)
    }

    mod = e.addLootTypeModifier(LootType.CHEST)
    for (let enchant of bad_enchants) {
        mod = mod
            .removeLoot(ItemFilter.hasEnchantment(enchant))
    }

    e.addBlockLootModifier("minecraft:spawner")
        .addLoot(
            LootEntry.of("kubejs:spawner_fragment")
//                .applyBinomialDistributionBonus("minecraft:silk_touch", 0.7, 3)
                .applyBinomialDistributionBonus("minecraft:fortune", 0.3, 1)
        )

    e.addLootTableModifier("minecraft:chests/nether_bridge")
        .addLoot(LootEntry.of("kubejs:heart_of_the_flame").when(c => c.randomChance(0.5)))

    e.addLootTableModifier("betterdeserttemples:chests/tomb_pharaoh")
        .addLoot("kubejs:heart_of_the_sand")

    e.addLootTableModifier("betterjungletemples:chests/treasure")
        .addLoot("kubejs:heart_of_the_jungle")
})
