// Простой пример 

interface Animal {
    live(): void;
}
interface Dog extends Animal {
    woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;

// with generics

interface IdLabel {
    id: number /* some fields */;
}
interface NameLabel {
    name: string /* other fields */;
}

type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
}

let a = createLabel("typescript");
let b = createLabel(2.8)
let c = createLabel(Math.random() ? "hello" : 42);

// more

type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
    message: string;
}

interface Dog {
    bark(): void;
}

type EmailMessageContents = MessageOf<Email>;

type DogMessageContents = MessageOf<Dog>;

// more

type Flatten<T> = T extends any[] ? T[number] : T;
// or
type Flatten1<Type> = Type extends Array<infer Item> ? Item : Type;

// Extracts out the element type.
type Str = Flatten<string[]>;
type Num = Flatten<number>;

// with infer
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
    ? Return
    : never;

type Num1 = GetReturnType<() => number>;
type Str1 = GetReturnType<(x: string) => string>;
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;


/* 
When inferring from a type with multiple call
 signatures (such as the type of an overloaded function),
  inferences are made from the last signature
**/

declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;

// Distributive Conditional Types
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
// 'ArrOfStrOrNum' is no longer a union.
type ArrOfStrOrNum = ToArrayNonDist<string | number>;