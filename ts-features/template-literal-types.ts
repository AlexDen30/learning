//--------- Template Literal Types ----------

// object literal utility types (Uppercase, Lowercase, Capitalize, Uncapitalize)
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">

/* 
Common Use Case of declare:

You add a reference to your web page to a JavaScript file that the compiler knows nothing about.
Maybe it is a script coming from some other domain like 'foo.com'. 
When evaluated the script will create an object with some useful
API methods and assign it to the identifier 'fooSdk' on the global scope.

You want your TypeScript code to be able to call fooSdk.doSomething(),
but since your compiler does not know fooSdk variable exists,
you will get a compilation error.

You then use the declare keyword as a way of telling the compiler
"trust me, this variable exists and has this type". 
The compiler will use this statement to statically 
check other code but will not trans-compile 
it into any JavaScript in the output.
**/

// typecheck handler of object properties (template literals type)
type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const watchedObj = makeWatchedObject({
    height: 170,
    depth: 23,
    name: 'geometric obj'
});
//+
watchedObj.on('depthChanged', depth => console.log(depth))
//-
//watchedObj.on('onDepthChanged', depth => console.log(depth))
//watchedObj.on('depthIncreased', depth => console.log(depth))