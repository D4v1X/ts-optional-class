# Optional
[![npm](https://badge.fury.io/js/ts-optional-class.svg)](https://badge.fury.io/js/ts-optional-class)
[![Build](https://travis-ci.org/D4v1X/ts-optional-class.svg?branch=master)](https://travis-ci.org/D4v1X/ts-optional-class)
[![Coverage Status](https://coveralls.io/repos/github/D4v1X/ts-optional-class/badge.svg?branch=master)](https://coveralls.io/github/D4v1X/ts-optional-class?branch=master)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Optional for Typescript inspired by the Java Optional.

### Install

```
npm install --save ts-optional-class
```

### Usage

#### Example:

```ts
import {Optional} from 'ts-optional-class/dist/optional';

const active: boolean = Optional
  .of(user)
  .map(user => user.active)
  .orElse(false);
```

#### API

You have four ways to create an optional:

```ts
Optional.empty();
Optional.of(value); // throws error if value is null
Optional.ofNullable(value);
Optional.ofAnything(value); // throws error if value is undefined
```