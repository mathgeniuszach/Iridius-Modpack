MoreJSEvents.registerPotionBrewing(e => {
    e.removeByPotion(null, null, "apotheosis:flying")
    e.removeByPotion(null, null, "apotheosis:long_flying")
    e.removeByPotion(null, null, "apotheosis:extra_long_flying")
    e.removeByPotion(null, null, "apotheosis:levitation")
})

StartupEvents.registry("item", e => {
    e.create("rice_flour")
        .displayName("Rice Flour")
        .texture("kubejs:item/rice_flour")
    e.create("rice_dough")
        .displayName("Rice Dough")
        .texture("kubejs:item/rice_dough")
        .food(food => food.hunger(2).saturation(0.5))
    
    function makeDrink(item, name, texture, f, using) {
        let drink = e.create(item)
        drink
            .displayName(name)
            .texture(texture)
            .maxStackSize(16)
            .containerItem("minecraft:glass_bottle")
            .tag("farmersdelight:drinks")
            .tag("create:upright_on_belt")
            .useAnimation('drink')
            .use((level, player, hand) => true)
            .useDuration(itemstack => 32)
            .finishUsing((itemstack, level, entity) => {
                if (using) using(itemstack, level, entity)
                if (itemstack.count <= 1) {
                    return Item.of("minecraft:glass_bottle")
                } else {
                    itemstack.shrink(1)
                    entity.runCommandSilent("give @s minecraft:glass_bottle")
                }
                return itemstack
            })
        if (f) f(drink)
    }
    makeDrink("apple_juice", "Apple Juice", "expandeddelight:item/apple_juice", null,
        (_1, _2, entity) => {
            entity.removeEffect("minecraft:poison")
            entity.removeEffect("minecraft:wither")
        }
    )
    makeDrink("sweet_berry_juice", "Sweet Berry Juice", "expandeddelight:item/sweet_berry_juice",
        e => e.food(b => b.effect("minecraft:speed", 30*20, 0, 1)),
        (_1, _2, entity) => entity.runCommandSilent("effect give @s minecraft:speed 30 0")
    )
    makeDrink("glow_berry_juice", "Glow Berry Juice", "expandeddelight:item/glow_berry_juice",
        e => e.food(b => b.effect("minecraft:glowing", 30*20, 0, 1)),
        (_1, _2, entity) => entity.runCommandSilent("effect give @s minecraft:glowing 30 0")
    )
    makeDrink("golden_apple_juice", "Golden Apple Juice", "expandeddelight:item/golden_apple_juice",
        e => e.food(b => b.effect("minecraft:regeneration", 60*20, 0, 1)),
        (_1, _2, entity) => entity.runCommandSilent("effect give @s minecraft:regeneration 60 0")
    )
    makeDrink("enchanted_golden_apple_juice", "Enchanted Golden Apple Juice", "expandeddelight:item/enchanted_golden_apple_juice",
        e => e.glow(true).food(b => {
            b.effect("minecraft:regeneration", 90*20, 1, 1)
            b.effect("minecraft:fire_resistance", 5*60*20, 0, 1)
        }),
        (_1, _2, entity) => {
            entity.runCommandSilent("effect give @s minecraft:regeneration 90 1")
            entity.runCommandSilent("effect give @s minecraft:fire_resistance 300 0")
        }
    )
    makeDrink("pumpkin_juice", "Pumpkin Juice", "expandeddelight:item/pumpkin_juice",
        e => e.food(b => b.effect("minecraft:health_boost", 60*20, 0, 1)),
        (_1, _2, entity) => entity.runCommandSilent("effect give @s minecraft:health_boost 60 0")
    )
    makeDrink("fruit_punch", "Fruit Punch", "expandeddelight:item/fruit_punch",
        e => e.food(b => {
            b.effect("minecraft:speed", 30*20, 0, 1)
            b.effect("minecraft:jump_boost", 30*20, 0, 1)
            b.effect("minecraft:strength", 30*20, 0, 1)
        }),
        (_1, _2, entity) => {
            entity.runCommandSilent("effect give @s minecraft:speed 30 0")
            entity.runCommandSilent("effect give @s minecraft:jump_boost 30 0")
            entity.runCommandSilent("effect give @s minecraft:strength 30 0")
        }
    )

    // e.create("banana_dough")
    //     .displayName("Banana Dough")
    //     .texture("kubejs:item/banana_dough")
    //     .food(food => food.hunger(2).saturation(0.25))
    
    // e.create("cake_batter")
    //     .displayName("Cake Batter")
    //     .texture("kubejs:item/cake_batter")
    // e.create("chocolate_cake_batter")
    //     .displayName("Chocolate Cake Batter")
    //     .texture("kubejs:item/cake_batter")
    // e.create("cake_base")
    //     .displayName("Cake Base")
    //     .texture("kubejs:item/cake_base")
    // e.create("cake_base_slice")
    //     .displayName("Cake Base Slice")
    //     .texture("kubejs:item/cake_base_slice")

    e.create("spawner_fragment")
        .displayName("Spawner Fragment")
        .texture("kubejs:item/spawner_fragment")
    e.create("sand_particle")
        .displayName("Sand Clump")
        .texture("kubejs:item/sand_particle")
    
    e.create("heart_of_the_flame")
        .displayName("Heart of the Flame")
        .rarity("Uncommon")
        .burnTime(2147483647)
        .texture("kubejs:item/heart_of_the_flame")
        .fireResistant(true)
    e.create("heart_of_the_void")
        .displayName("Heart of the Void")
        .rarity("Uncommon")
        .texture("kubejs:item/heart_of_the_void")
    e.create("heart_of_the_frost")
        .displayName("Heart of the Frost")
        .rarity("Uncommon")
        .texture("kubejs:item/heart_of_the_frost")
    e.create("heart_of_the_air")
        .displayName("Heart of the Air")
        .rarity("Uncommon")
        .texture("kubejs:item/heart_of_the_air")
        .fireResistant(true)
    e.create("pebble_of_the_earth")
        .displayName("Pebble of the Earth")
        .texture("kubejs:item/pebble_of_the_earth")
    e.create("chunk_of_the_earth")
        .displayName("Chunk of the Earth")
        .rarity("Uncommon")
        .texture("kubejs:item/chunk_of_the_earth")
    e.create("heart_of_the_earth")
        .displayName("Heart of the Earth")
        .rarity("Rare")
        .texture("kubejs:item/heart_of_the_earth")
        .fireResistant(true)
    e.create("heart_of_the_sand")
        .displayName("Heart of the Sand")
        .rarity("Uncommon")
        .texture("kubejs:item/heart_of_the_sand")
    e.create("heart_of_the_jungle")
        .displayName("Heart of the Jungle")
        .rarity("Uncommon")
        .texture("kubejs:item/heart_of_the_jungle")
    e.create("heart_of_the_cards")
        .displayName("Heart of the Cards")
        .rarity("Rare")
        .texture("kubejs:item/heart_of_the_cards")
    e.create("heart_of_the_elements")
        .displayName("Heart of the Elements")
        .rarity("Epic")
        .texture("kubejs:item/heart_of_the_elements")
})
