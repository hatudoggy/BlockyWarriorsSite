

export interface WarriorDetails {
  photoURL: string
  number: number
  name: string
  price: number
  type: Type
  rarity: Rarity
}

export type Rarity = 'common' | 'rare' | 'mythic' | 'legendary'
export type Type = 'melee' | 'mage' | 'archer' | 'gunner'