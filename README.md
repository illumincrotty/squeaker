# 📣 squeaker

<!-- PROJECT LOGO -->
<img src="https://i.imgur.com/HYEN9DZ.png" alt="logo" width="200"/>

<!-- Shields -->

![npm](https://img.shields.io/npm/l/squeaker.svg)
![size-badge](https://img.badgesize.io/https:/unpkg.com/squeaker/dist/index.modern.js?compression=brotli)
![Types](https://badgen.net/npm/types/squeaker)
[![codecov](https://codecov.io/gh/illumincrotty/squeaker/branch/main/graph/badge.svg?token=W17SYOVM6T)](https://codecov.io/gh/illumincrotty/squeaker)

</div>

---

<p align="center"> A tiny (but advanced) noise generation module
</p>

## 📝 Table of Contents

- [📣 squeaker](#-squeaker)
  - [📝 Table of Contents](#-table-of-contents)
  - [🧐 About](#-about)
  - [Install](#install)
    - [Package Manager](#package-manager)
    - [CDN](#cdn)
  - [🎈 Usage](#-usage)
  - [📖 Example](#-example)
  - [🔧 Running the tests](#-running-the-tests)
  - [📃 License](#-license)
  - [✍️ Authors](#️-authors)
  - [🔨 Similar Tools](#-similar-tools)

## 🧐 About

I was largely unsatisfied with the options for noise generation that I could find. Often they only provided simplex noise, if they did have perlin noise it lack sizing customization, seeding, or types. So, I decided to take it upon myself to make a smooth noise generator that offered a variety of generation methods with customizable sizes and seeded generation. Enjoy!

## Install

### Package Manager

#### NPM <!-- omit in TOC -->

```sh
npm i squeaker
```

#### PNPM <!-- omit in TOC -->

```sh
pnpm add squeaker
```

#### Yarn <!-- omit in TOC -->

```sh
yarn add squeaker
```

### CDN

#### Skypack <!-- omit in TOC -->

For Web and Deno, no install is required! Just put this line at the top of your file:

```typescript
import squeaker from 'https://cdn.skypack.dev/squeaker';
```

If you want type support with skypack, follow the directions [here]('https://docs.skypack.dev/skypack-cdn/code/javascript#using-skypack-urls-in-typescript')

#### UNPKG <!-- omit in TOC -->

```html
<script src="https://unpkg.com/squeaker"></script>
```

And use it like you would any other package from UNPKG

## 🎈 Usage

Here's the great part: thanks to [microbundle](https://github.com/developit/microbundle), this package supports CJS, UMD, and ESM formats.
That means that wherever and however you use this package — in browser or node, with import or require — you _should_ be set, no configuration required.

## 📖 Example

To create a noise generator, just use one of the named exports!

```typescript
import {
	perlinNoise1dFactory,
	perlinNoise2dFactory,
	perlinNoise3dFactory,
	valueNoise1dFactory,
	valueNoise2dFactory,
	valueNoise3dFactory,
	randomFactory,
	interpolationQuintic,
} from 'squeaker';

// create a noise generating function
const noise = perlinNoise2dFactory({ seed: 13223412 });
// and get some smooth random noise
console.log(noise(502.8378, 1003.11)); // 0.48293299950320834
console.log(noise(502.9378, 1003.11)); // 0.44430917275215664

// seed the generator with a random function of your choosing
const customRandom = randomFactory('seed value').random;

// also offers value noise
const noise3d = valueNoise3dFactory({ random: customRandom });
console.log(noise3d(67.37, 12.12, 5 / 83)); // 0.6996699510042976
console.log(noise3d(67.37, 12.19, 6 / 83)); // 0.6684093711981097

// use custom interpolation functions
const noiseVerySmooth = valueNoise3dFactory({
	blendFunction: interpolationQuintic,
});

// or start to tile at set intervals
const noiseTiles = perlinNoise2dFactory({
	seed: 'example',
	xSize: 10,
	ySize: 40,
});
console.log(noiseTiles(0.5, 0.5)); // 0.5245568341212135
console.log(noiseTiles(10.5, 40.5)); // 0.5245568341212135
```

## 🔧 Running the tests

The basic set of tests are in the test script, the coverage script, and the report script. Just run those using your perferred package manager (npm, yarn, pnpm, etc.) to make sure nothing has broken.

<!-- LICENSE -->

## 📃 License

Distributed under the MIT License. See `LICENSE` for more information.

## ✍️ Authors

Find me [@illumincrotty](https://github.com/illumincrotty) on github or [@illumincrotty](https://twitter.com/illumincrotty) on twitter

## 🔨 Similar Tools

If this tool isn't working for you, try one of these:

-   [zufall](https://github.com/tstelzer/zufall)
-   [asm-noise](https://github.com/WesleyClements/asm-noise)
