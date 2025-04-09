export interface FoursquarePlacesResponse {
  results: Place[];
  context: Context;
}

export interface Place {
  fsq_id: string;
  categories: Category[];
  chains: Chain[];
  closed_bucket: string;
  date_closed: string;
  description: string;
  distance: number;
  email: string;
  fax: string;
  features: Features;
  geocodes: Geocodes;
  hours: Hours;
  hours_popular: HoursPopular[];
  link: string;
  location: Location;
  menu: string;
  name: string;
  photos: Photo[];
  popularity: number;
  price: number;
  rating: number;
  related_places: Record<string, unknown>;
  social_media: SocialMedia;
  stats: Stats;
  store_id: string;
  tastes: string[];
  tel: string;
  timezone: string;
  tips: Tip[];
  venue_reality_bucket: string;
  verified: boolean;
  website: string;
}

export interface Category {
  id: number;
  name: string;
  short_name: string;
  plural_name: string;
  icon: Icon;
}

export interface Icon {
  id: string;
  created_at: string; // ISO date string
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  classifications: string[];
  tip: IconTip;
}

export interface IconTip {
  id: string;
  created_at: string;
  text: string;
  url: string;
  lang: string;
  agree_count: number;
  disagree_count: number;
}

export interface Chain {
  id: string;
  name: string;
}

export interface Features {
  payment: Payment;
  food_and_drink: FoodAndDrink;
  services: Services;
  amenities: Amenities;
  attributes: Attributes;
}

export interface Payment {
  credit_cards: CreditCards;
  digital_wallet: DigitalWallet;
}

export interface CreditCards {
  accepts_credit_cards: Record<string, unknown>;
  amex: Record<string, unknown>;
  discover: Record<string, unknown>;
  visa: Record<string, unknown>;
  diners_club: Record<string, unknown>;
  master_card: Record<string, unknown>;
  union_pay: Record<string, unknown>;
}

export interface DigitalWallet {
  accepts_nfc: Record<string, unknown>;
}

export interface FoodAndDrink {
  alcohol: Alcohol;
  meals: Meals;
}

export interface Alcohol {
  bar_service: Record<string, unknown>;
  beer: Record<string, unknown>;
  byo: Record<string, unknown>;
  cocktails: Record<string, unknown>;
  full_bar: Record<string, unknown>;
  wine: Record<string, unknown>;
}

export interface Meals {
  bar_snacks: Record<string, unknown>;
  breakfast: Record<string, unknown>;
  brunch: Record<string, unknown>;
  lunch: Record<string, unknown>;
  happy_hour: Record<string, unknown>;
  dessert: Record<string, unknown>;
  dinner: Record<string, unknown>;
  tasting_menu: Record<string, unknown>;
}

export interface Services {
  delivery: Record<string, unknown>;
  takeout: Record<string, unknown>;
  drive_through: Record<string, unknown>;
  dine_in: DineIn;
}

export interface DineIn {
  reservations: Record<string, unknown>;
  online_reservations: Record<string, unknown>;
  groups_only_reservations: Record<string, unknown>;
  essential_reservations: Record<string, unknown>;
}

export interface Amenities {
  restroom: Record<string, unknown>;
  smoking: Record<string, unknown>;
  jukebox: Record<string, unknown>;
  music: Record<string, unknown>;
  live_music: Record<string, unknown>;
  private_room: Record<string, unknown>;
  outdoor_seating: Record<string, unknown>;
  tvs: Record<string, unknown>;
  atm: Record<string, unknown>;
  coat_check: Record<string, unknown>;
  wheelchair_accessible: Record<string, unknown>;
  parking: Parking;
  sit_down_dining: Record<string, unknown>;
  wifi: string;
}

export interface Parking {
  parking: Record<string, unknown>;
  street_parking: Record<string, unknown>;
  valet_parking: Record<string, unknown>;
  public_lot: Record<string, unknown>;
  private_lot: Record<string, unknown>;
}

export interface Attributes {
  business_meeting: string;
  clean: string;
  crowded: string;
  dates_popular: string;
  dressy: string;
  families_popular: string;
  gluten_free_diet: string;
  good_for_dogs: string;
  groups_popular: string;
  healthy_diet: string;
  late_night: string;
  noisy: string;
  quick_bite: string;
  romantic: string;
  service_quality: string;
  singles_popular: string;
  special_occasion: string;
  trendy: string;
  value_for_money: string;
  vegan_diet: string;
  vegetarian_diet: string;
}

export interface Geocodes {
  drop_off: LatLng;
  front_door: LatLng;
  main: LatLng;
  road: LatLng;
  roof: LatLng;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface Hours {
  display: string;
  is_local_holiday: boolean;
  open_now: boolean;
  regular: HoursRegular[];
}

export interface HoursRegular {
  close: string;
  day: number;
  open: string;
}

export interface HoursPopular {
  close: string;
  day: number;
  open: string;
}

export interface Location {
  address: string;
  address_extended: string;
  admin_region: string;
  census_block: string;
  country: string;
  cross_street: string;
  dma: string;
  formatted_address: string;
  locality: string;
  neighborhood: string[];
  po_box: string;
  post_town: string;
  postcode: string;
  region: string;
}

export interface Photo {
  id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  classifications: string[];
  tip: PhotoTip;
}

export interface PhotoTip {
  id: string;
  created_at: string;
  text: string;
  url: string;
  lang: string;
  agree_count: number;
  disagree_count: number;
}

export interface SocialMedia {
  facebook_id: string;
  instagram: string;
  twitter: string;
}

export interface Stats {
  total_photos: number;
  total_ratings: number;
  total_tips: number;
}

export interface Tip {
  id: string;
  created_at: string;
  text: string;
  url: string;
  lang: string;
  agree_count: number;
  disagree_count: number;
}

export interface Context {
  geo_bounds: GeoBounds;
}

export interface GeoBounds {
  circle: Circle;
}

export interface Circle {
  center: LatLng;
  radius: number;
}
