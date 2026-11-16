import type { MenuItem } from '../types';

const created = '2026-09-01T08:00:00.000Z';

const make = (
  id: string,
  name: string,
  course: MenuItem['course'],
  price: number,
  description: string,
  ingredients: string[],
  prepTime: number,
  image?: string,
): MenuItem => ({
  id,
  name,
  course,
  price,
  description,
  ingredients,
  prepTime,
  isAvailable: true,
  image,
  dateCreated: created,
  lastModified: created,
});

export const SEED_MENU: MenuItem[] = [
  make('1', 'Quiche Lorraine', 'Starter', 145, 'Classic savoury tart with smoked lardons, gruyère and a silky egg custard.', ['Eggs', 'Cream', 'Lardons', 'Gruyère'], 25, '/images/quiche-lorraine.jpg'),
  make('2', 'Croissant', 'Starter', 85, 'Flaky, golden butter croissant baked fresh each morning.', ['Butter', 'Flour', 'Yeast'], 15, '/images/croissant.jpg'),
  make('3', 'Coq au Vin', 'Main', 295, 'Chicken slow-braised in red Burgundy with mushrooms, pearl onions and bacon.', ['Chicken', 'Red wine', 'Mushrooms', 'Bacon'], 45, '/images/coq-au-vin.jpg'),
  make('4', 'Cassoulet Savoureux', 'Main', 310, 'Rich white-bean casserole with duck confit, sausage and pork.', ['White beans', 'Duck confit', 'Sausage', 'Pork'], 50, '/images/cassoulet.jpg'),
  make('5', 'Ratatouille', 'Main', 185, 'Provençal vegetable stew of aubergine, courgette, peppers and tomato.', ['Aubergine', 'Courgette', 'Peppers', 'Tomato'], 35, '/images/ratatouille.jpg'),
  make('6', 'Crème Brûlée', 'Dessert', 120, 'Vanilla bean custard finished with a crisp caramelised sugar crust.', ['Cream', 'Egg yolks', 'Vanilla', 'Sugar'], 20, '/images/creme-brulee.jpg'),
  make('7', 'Kir Royale', 'Drink', 110, 'Champagne with a measure of crème de cassis.', ['Champagne', 'Crème de cassis'], 3),
  make('8', 'Bordeaux Rouge', 'Drink', 98, 'A glass of smooth, full-bodied Bordeaux red.', ['Bordeaux red wine'], 2),
  make('9', 'Citron Pressé', 'Drink', 55, 'Freshly pressed lemon served with sugar and chilled water.', ['Lemon', 'Sugar', 'Water'], 3),
  make('10', 'Café au Lait', 'Drink', 48, 'Strong French coffee with steamed milk.', ['Coffee', 'Milk'], 4),
];
