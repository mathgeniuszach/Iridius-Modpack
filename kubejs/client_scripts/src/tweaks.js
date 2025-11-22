ItemEvents.tooltip(e => {
    for (let lore of [
        ["kubejs:heart_of_the_elements", ["Right click to ascend..."]],
        ["minecraft:spawner", ["Give it a spawn egg to work.", "Be careful, it cannot be moved!"]],
        ["minecraft:heart_of_the_sea", ["Infused with the power of the sea."]],
        ["kubejs:spawner_fragment", ["Obtained by breaking spawners"]],
        ["kubejs:pebble_of_the_earth", ["When minerals combine..."]],
        ["kubejs:chunk_of_the_earth", ["...and density increases..."]],
        ["kubejs:heart_of_the_earth", ["...it's really just dirt, isn't it?", "Right click for dirt."]],
        ["kubejs:heart_of_the_sand", ["Infused with the power of the desert.", "Right click for sand."]],
        ["kubejs:heart_of_the_cards", ["You've activated my Trap Card!", "Right click to toggle invisibility."]],
        ["kubejs:heart_of_the_flame", ["Burns for over three real-time years."]],
        ["kubejs:heart_of_the_void", ["Effectively a black hole.", "Right click bedrock to open the void.", "Takes some time to cooldown."]],
        ["kubejs:heart_of_the_air", ["A relic holding the air of times long past."]],
        ["kubejs:heart_of_the_jungle", ["It belongs in a museum."]],
        ["kubejs:heart_of_the_frost", ["The cold never bothered me anyway."]],
        ["farmersdelight:skillet", ["Also known as a Frying Pan."]],
        ["ends_delight:end_stone_knife", ["Too energetic for a Tetra Workbench."]],
        ["ends_delight:purpur_knife", ["Too energetic for a Tetra Workbench."]],
        ["ends_delight:dragon_egg_shell_knife", ["Too energetic for a Tetra Workbench."]],
        ["ends_delight:dragon_tooth_knife", ["Too energetic for a Tetra Workbench."]],
        ["vintagedelight:magic_vine", ["Too magical for stripping with Tetra tools."]],
        ["aquaculturedelight:neptunium_knife", ["Too energetic for a Tetra Workbench."]],
    ]) {
        e.addAdvanced(lore[0], ((lore) => (item, advanced, text) => {
            for (let i = 0; i < lore[1].length; i++) {
                text.add(i+1, Text.of(lore[1][i]).gray().italic())
            }
        })(lore))
    }
    
    for (let lore of [
        ["kubejs:apple_juice", ["Clears Poison and Wither"]],
        ["farmersdelight:melon_juice", ["Minor Instant Health"]],
        ["farmersdelight:hot_cocoa", ["Clears a Negative Effect"]],
        ["neapolitan:milk_bottle", ["Clears an Effect"]],
        ["miners_delight:milk_cup", ["Clears an Effect"]],
        ["vintagedelight:nut_milk_bottle", ["Clears an Effect"]],
        ["minecraft:milk_bucket", ["Clears all Effects"]],
        ["ends_delight:chorus_fruit_wine", ["Clears Levitation"]],
    ]) {
        e.addAdvanced(lore[0], ((lore) => (item, advanced, text) => {
            for (let i = 0; i < lore[1].length; i++) {
                text.add(i+1, Text.of(lore[1][i]).blue())
            }
        })(lore))
    }
})
