# expressible-js
A library that attempts to work around the expression problem.

The term "The Expression Problem" was coined by Philip Wadler. In his 1998 essay, he introduces it by saying

> The goal is to define a datatype by cases, where one can add new cases to the datatype and new functions over the datatype, without recompiling existing code (...)

In other words, Given a Data Type and the Operations over the Data Type, there are two axis of extension:
 1. Adding additional cases of the type
 2. Adding additional operations over the type
This is often framed as a fundamental difference between the "functional" and "object oriented" paradigms.

The simple concrete example of "Expressions" provided by Wadler can be used to demonstrate.

> For the concrete example, we take expressions as the data
> type, begin with one case (constants) and one function (evaluators),
> then add one more construct (plus) and one more function (conversion
> to a string).

In Object Oriented code, the initial `Constant` constructor of the Expression type, with an `evaluate` function could be expressed as a constructor function like this:

```
function Constant(value) {
    this.evaluate = () => value;
}
```

In this paradigm adding the new constructor `Plus` is straightforward:

```
function Plus(left, right) {
    this.evaluate = () => left.evaluate() + right.evaluate();
}
```

But then adding the new "show" (convert to string) operation without editing all existing data constructors isn't possible.

Taking a functional approach, the same Data Structure could be expressed something like:

```
const Constant = (value) => (dispatches) =>
    dispatches['Constant'].call(this, value);

const evaluate = (expr) => expr({
    Constant: (value) => value,
});
```

In this paradigm adding a new operation "show" is straightforward:

```
const show = (expr) => expr({
    Constant: (value) => value.toString(),
});
```

But adding the new `Plus` constructor without editing the definition for all existing operations isn't possible.

By using JavaScript's prototypes, it *is* possible to extend along both axis.

```
function Constant(value) {
    this.value = value;
}

Constant.prototype.evaluate = function() {
    return this.value;
}
```

Adding `Plus`:

```
function Plus(left, right) {
    this.left = left;
    this.right = right;
}
Plus.prototype.evaluate = function() {
    return this.left.evaluate() + this.right.evaluate();
}
```

Adding `show`:

```
Constant.prototype.show = function() {
    return this.value.toString();
}

Plus.prototype.show = function() {
    return `${this.left.show()} + ${this.right.show()}`;
}
```

This isn't too bad, but unfortunately it loses the encapsulation of the Object Oriented style and the (Psuedo-)Pattern Matching of the functional style - Possibly the best aspect of each.
Expressible.js is an attempt to bring both of these features back, with a simple API. Using the Expressible library, the solution could be expressed like so:

```
const Expressible = require('expressible');

const Expr = Expressible.total({
  Constant: {
    evaluate: Expressible.nullary((value) => value),
  },
  /* ... */
});
```

Adding `Plus`:

```
Expressible.addDataType(Expr, 'Plus', {
    show: Expressible.nullary((left, right) => left + right),
});
```

Adding `show`:

```
Expressible.addOperation(Expr, 'show', {
  Constant: Expressible.nullary((value) => value.toString),
  Plus: Expressible.nullary((left, right) => `${left} + ${right}`),
});
```
