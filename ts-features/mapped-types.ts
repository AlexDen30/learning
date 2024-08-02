

// first: https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
// Indexed Access Types
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
// type I1 = Person["alve"];

const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
];

type Person1 = typeof MyArray[number];
type key = "age";
type Age1 = Person1[key];

/* 
A mapped type is a generic type which uses
a union of PropertyKeys (frequently created via a keyof)
to iterate through keys to create a type:
**/
// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

// cast all fields to boolean
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};

type Features = {
    darkMode: () => void;
    newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>;

// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
    readonly id: string;
    readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
};

type User = Concrete<MaybeUser>;

// In TypeScript 4.1 and onwards, you can re-map keys in mapped types with an as clause in a mapped type:
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person2 {
    name: string;
    age: number;
    location: string;
}

type LazyPerson = Getters<Person2>;

/* 
Mapped types work well with other features
 in this type manipulation section, for example
  here is a mapped type using a conditional type
   which returns either a true or false depending
    on whether an object has the property pii set
     to the literal true:
**/

type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;