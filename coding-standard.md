# TypeScript Coding Standard

TypeScript is a statically typed superset of JavaScript, and it follows several conventions to help write clean and maintainable code. Here are some TypeScript conventions and best practices:

## Table of contents

- [Typescript Coding Style Guide](#typescript-coding-style-guide)
  - [Naming](#naming)
  - [Naming Conventions](#naming-conventions)
  - [Naming Booleans](#naming-booleans)
  - [Naming Module](#naming-module)
  - [Brackets](#brackets)
  - [Spaces](#spaces)
  - [Semicolons](#semicolons)
  - [Comments](#comments)
  - [Barrels](#barrels)
- [Playwright Good Practice](#playwright-good-practice)
  - [Organize Imports](#organize-imports)
  - [Use TypeScript Aliases](#use-typescript-aliases)
  - [Formatting Plugin](#formatting-plugin)
  - [Async and Await](#async-and-await)
  - [Naming UI Element](#naming-ui-element)

# Typescript Coding Style Guide

## Naming

The name of a variable, function, or class, should answer all the big questions. It should tell you why it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal its intent.

**Use meaningful variable names.**

Distinguish names in such a way that the reader knows what the differences offer.

Bad:

```typescript
function isBetween(a1: number, a2: number, a3: number): boolean {
  return a2 <= a1 && a1 <= a3;
}
```

Good:

```typescript
function isBetween(value: number, left: number, right: number): boolean {
  return left <= value && value <= right;
}
```

**Use pronounceable variable names**

If you can't pronounce it, you can't discuss it without sounding weird.

Bad:

```typescript
class Subs {
  public ccId: number;
  public billingAddrId: number;
  public shippingAddrId: number;
}
```

Good:

```typescript
class Subscription {
  public creditCardId: number;
  public billingAddressId: number;
  public shippingAddressId: number;
}
```

**Avoid mental mapping**

Explicit is better than implicit.<br />
_Clarity is king._

Bad:

```typescript
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

Good:

```typescript
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

**Don't add unneeded context**

If your class/type/object name tells you something, don't repeat that in your variable name.

Bad:

```typescript
type Car = {
  carMake: string;
  carModel: string;
  carColor: string;
};

function print(car: Car): void {
  console.log(`${car.carMake} ${car.carModel} (${car.carColor})`);
}
```

Good:

```typescript
type Car = {
  make: string;
  model: string;
  color: string;
};

function print(car: Car): void {
  console.log(`${car.make} ${car.model} (${car.color})`);
}
```

## Naming Conventions

- Use camelCase for variable and function names

Bad:

```typescript
var FooVar;
function BarFunc() {}
```

Good:

```typescript
var fooVar;
function barFunc() {}
```

- Use camelCase of class members, interface members, methods and methods parameters

Bad:

```typescript
class Foo {
  Bar: number;
  Baz() {}
}
```

Good:

```typescript
class Foo {
  bar: number;
  baz() {}
}
```

- Use PascalCase for class names and interface names.

Bad:

```typescript
class foo {}
```

Good:

```typescript
class Foo {}
```

- Use PascalCase for enums and PascalCase for enum members

Bad:

```typescript
enum statusResult {
  PASSED = 1,
  FAILED = 2,
  ERROR = 3,
  NAN = 4,
}
```

Good:

```typescript
enum StatusResult {
  Passed = 1,
  Failed = 2,
  Error = 3,
  NaN = 4,
}

enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400,
}

enum CardinalDirections {
  North = 'North',
  East = 'East',
  South = 'South',
  West = 'West',
}
```

## Naming Booleans

- Don't use negative names for boolean variables.

Bad:

```typescript
const isNotEnabled = true;
```

Good:

```typescript
const isEnabled = false;
```

- A prefix like is, are, or has helps every developer to distinguish a boolean from another variable by just looking at it

Bad:

```typescript
const enabled = false;
```

Good:

```typescript
const isEnabled = false;
```

## Naming Module

- Using lowercase combines with "score an dot" to module and folder containing module
- Parent name of modules is plural noun like tests, utils, helpers, etc
  Bad:

```
    .
    ├── ...
    ├── PagesObject
    │   ├── HomePage.ts
    │   └── AboutPage.ts
    ├── tests
    │   ├── iOS
    │   │   └── [iOS][Manual Session][Latest Device] Verify Feature ABC.spec.ts
    │   └── Android
    │       └── [Android][Manual Session][Latest Device] Verify Feature ABC.spec.ts
    ├── Utils
    │   └── Common
    │       └── date-time.helper.ts
    └── ...

```

Good:

```
    .
    ├── ...
    ├── page-objects
    │   ├── home.page.ts
    │   └── about.page.ts
    ├── tests
    │   ├── ios
    │   │   └── manual-session.latest-device.feature-abc.spec.ts
    │   └── android
    │       └── manual-session.latest-device.feature-abc.spec.ts
    ├── utils
    │   └── common
    │       └── datetime.helper.ts
    └── ...
```

## Brackets

- **OTBS** (one true brace style). [Wikipedia](<https://en.wikipedia.org/wiki/Indentation_style#Variant:_1TBS_(OTBS)>)

The one true brace style is one of the most common brace styles in TypeScript, in which the opening brace of a block is placed on the same line as its corresponding statement or declaration.

```typescript
function check_negative(x) {
  if (x < 0) {
    puts('Negative');
  } else {
    nonnegative(x);
  }
}
```

- Do not omit curly brackets
- **Always** wrap the body of the statement in curly brackets.

## Tab

Use tab instead of 2+ spaces.

## Semicolons

Use semicolons.

## Comments

> So when you find yourself in a position where you need to write a comment, think it through and see whether there isn't some way to turn the tables and express yourself in code. Every time you express yourself in code, you should pat yourself on the back. Everytime you write a comment, you should grimace and feel the failure of your ability of expression.

**Bad Comments**

Most comments fall into this category. Usually they are crutches or excuses for poor code or justifications for insufficient decisions, amounting to little more than the programmer talking to himself.

**Mumbling**

Plopping in a comment just because you feel you should or because the process requires it, is a hack. If you decide to write a comment, then spend the time necessary to make sure it is the best comment you can write.

**Noise Comments**

Sometimes you see comments that are nothing but noise. They restate the obvious and provide no new information.

```typescript
// redirect to the Contact Details screen
this.router.navigateByUrl(`/${ROOT}/contact`);
```

```typescript
// self explanatory, parse ...
this.parseProducts(products);
```

**Scary noise**

```typescript
/** The name. */
private name;

/** The version. */
private version;

/** The licenceName. */
private licenceName;

/** The version. */
private info;
```

Read these comments again more carefully. Do you see the cut-paste error? If authors aren't paying attention when comments are written (or pasted), why should readers be expected to profit from them?

**TODO Comments**

In general, TODO comments are a big risk. We may see something that we want to do later so we drop a quick **// TODO: Replace this method** thinking we'll come back to it but never do.

If you're going to write a TODO comment, you should link to your external issue tracker.

There are valid use cases for a TODO comment. Perhaps you're working on a big feature and you want to make a pull request that only fixes part of it. You also want to call out some refactoring that still needs to be done, but that you'll fix in another PR.

```typescript
// TODO: Consolidate both of these classes. PURCHASE-123
```

This is actionable because it forces us to go to our issue tracker and create a ticket. That is less likely to get lost than a code comment that will potentially never be seen again.

**Comments can sometimes be useful**

- When explaining why something is being implemented in a particular way.
- When explaining complex algorithms (when all other methods for simplifying the algorithm have been tried and come up short).

**Comment conventions**

- Write comments in _English_.
- Do not add empty comments
- Begin single-line comments with a single space

Good:

```typescript
// Single-line comment
```

Bad:

```typescript
//Single-line comment
//  Single-line comment
```

- Write single-line comments properly

  - Single-line comments should always be preceded by a single blank line.
  - Single-line comments should never be followed by blank line(s).

Good:

```typescript
const x;

// This comment is valid
const y;
```

Bad:

```typescript
const x;

// This comment is not valid

const y;
```

```typescript
const x;
// This comment is not valid

const y;
```

- Do not write embedded comments

  - Do not write comments between declaration of statement and opening curly brackets.
  - Place comments above statements, or within statement body.

Good:

```typescript
// This method does something..
public method() {
}
```

Bad:

```typescript
public method() { // This method does something..
}
```

```typescript
public method() {
// This method does something..
}
```

RECOMMENDATION

- Use comments to document your code, especially when it's not immediately obvious what the code does.
- Use JSDoc-style comments to document functions and classes.

```typescript
/**
 * This function adds two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of a and b.
 */
function add(a: number, b: number): number {
  return a + b;
}
```

## Barrels

> A barrel is a way to rollup exports from several modules into a single convenience module. The barrel itself is a module file that re-exports selected exports of other modules.

> **import noise** - this is an issue seen in languages where there are dependencies that need to be "imported", "required", or "included" and the first (1 - n) lines are non functional code.

Example of a barrel file:

```typescript
export * from './product-added-dialog.component';
export * from './website-selector.component';
export * from './product-family-selector.component';
export * from './individual-product-selector.component';
export * from './license-type-selector.component';
export * from './period-and-quantity-selector.component';
```

How to use it inside components:

Good:

```typescript
import { CartsService, PaidSupportService, SettingsService } from '@modules/services';
```

Bad:

```typescript
import { SettingsService } from './settings/settings.service';
import { CartsService } from './carts/carts.service';
import { PaidSupportService } from './paid-support/paid-support.service';
```

- Barrel files are named index.ts by convention
- Do not import a barrel in the files that are already used in that barrel because this leads to circular dependency

# Playwright Good Practice

## Organize Imports

With clean and easy to read import statements you can quickly see the dependencies of current code. Make sure you apply following good practices for import statements:

- Unused imports should be removed.
- Groups of imports are delineated by one blank line before and after.
- Groups must respect following order:
  - Playwright imports (i.e. import { HttpClient } from '@playwright/common/http')
  - Playwright material imports (i.e. import { MatSelectChange } from '@playwright/material/select')
  - 3rd party imports except rxjs (i.e. import { SessionStorageService } from 'ngx-webstorage')
  - application imports sorted by type (services, classes, interfaces, enums)

Bad:

```typescript
import { Injectable } from '@playwright/core';
import { merge, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@playwright/http';
import { MatSelectChange } from '@playwright/select';

import { filter, tap } from 'rxjs/operators';
import { INumberToTypeDictionary, Utils } from '@shared/classes';

import { ProductUtils } from '@modules/services/products/classes';

import { AdditionalServicesApi } from './additional-services-api';
```

Good:

```typescript
import { Injectable } from '@playwright/core';
import { HttpClient } from '@playwright/http';
import { MatSelectChange } from '@playwright/select';

import { merge, Observable, BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { INumberToTypeDictionary, Utils } from '@shared/classes';
import { ProductUtils } from '@modules/services/products/classes';
import { AdditionalServicesApi } from './additional-services-api';
```

## Use Typescript Aliases

This will avoid long relative paths when doing imports.

Bad:

```typescript
import { UserService } from '../../../services/UserService';
```

Good:

```typescript
import { UserService } from '@services/UserService';
```

## Component Structure

Use the following component structure:

1. Input properties (i.e. @Input() product: OrderItemModel)
2. Output properties (i.e. @Output() changeMade = new EventEmitter<void>(true))
3. ViewChild / ViewChildren (i.e. @ViewChild(ChildDirective) child!: ChildDirective)
4. HostBinding properties (i.e. @HostBinding('class.valid') get valid() { return this.control.valid; })
5. data members (i.e. public isBeingRemoved = false)
6. constructor
7. lifecycle hooks (following their execution order)
8. getters/setters
9. event handlers
10. other methods

Use the following component accessors order:

1. private
2. protected
3. public

- Separate each group with a whitespace before and after

## Formatting Plugin

Use a consistent code formatting style. Popular options:

- Prettier
- ESLint

With TypeScript-specific plugins to catch code quality issues.

## Async and Await

Use async and await for handling asynchronous operations instead of callbacks or Promises.

```typescript
async function fetchData() {
  const response = await fetch('https://example.com/data');
  const data = await response.json();
  return data;
}
```

## Naming UI Element

Use following prefix for locators to indicate the type of the UI element.
| Category | UI/Control type | Prefix | Example |
| -------- | ------------------ |------- |----------------- |
| Basic | Button | btn | btnOK |
| Basic | Check box | chk | chkEnable |
| Basic | Combo box | cbo | cboCountry |
| Basic | Common dialog | dlg | dlgFileOpen |
| Basic | Date picker | dtp | dtpExpired |
| Basic | Dropdown List | ddl | ddlCountry |
| Basic | Form | frm | frmEntry |
| Basic | Frame | fra | fraLanguage |
| Basic | Image | img | imgIcon |
| Basic | Label | lbl | lblMessage |
| Basic | Links | lnk | lnkAbout |
| Basic | List items | lst | lstItems |
| Basic | Menu | mnu | mnuSearch |
| Basic | Radio button | rdo | rdoGender |
| Basic | Table | tbl | tblCustomer |
| Basic | TabStrip | tab | tabOptions |
| Basic | Text Area | txa | txaDescription |
| Basic | Text box | txt | txtUserName |
| Complex | Chevron | chv | chvProtocol |
| Complex | Data grid | dgd | dgdTitles |
| Complex | Directory | dir | dirSource |
| Complex | File | fil | filSource |
| Complex | Panel/Fieldset | pnl | pnlGroup |
| Complex | ProgressBar | prg | prgLoading |
| Complex | Slider | sld | sldScale |
| Complex | Spinner | spn | spnPages |
| Complex | StatusBar | sta | staDateTime |
| Complex | Toolbar | tlb | tlbActions |
| Complex | Tooltip | tlt | tltMessage |
| Complex | TreeView | tre | treOrganization |

## Note

These conventions and best practices can help write clean, readable, and maintainable TypeScript code. However, always consider the specific requirements and coding standards of the project/team, as conventions may vary from one codebase to another.
