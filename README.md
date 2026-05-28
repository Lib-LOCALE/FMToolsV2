<p align="center">
  <img src="FMToolsV2.png" alt="FMToolsV2" width="128">
</p>

<h1 align="center">FMToolsV2</h1>

<p align="center">
  <strong>Desktop tools for Football Manager analysis</strong><br>
  Built with Svelte, TypeScript, Tauri, and multilingual support.
</p>

<p align="center">
  <a href="https://github.com/Lib-LOCALE/FMToolsV2/releases/latest">Download</a> ·
  <a href="#screenshots">Screenshots</a> ·
  <a href="#quality-and-release-process">Quality</a>
</p>

<p align="center">
  <a href="README_zh.md"><img src="https://hatscripts.github.io/circle-flags/flags/cn.svg" width="28" alt="Chinese"></a>&nbsp;
  <a href="README_ko.md"><img src="https://hatscripts.github.io/circle-flags/flags/kr.svg" width="28" alt="Korean"></a>&nbsp;
  <a href="README_da.md"><img src="https://hatscripts.github.io/circle-flags/flags/dk.svg" width="28" alt="Danish"></a>&nbsp;
  <a href="README_de.md"><img src="https://hatscripts.github.io/circle-flags/flags/de.svg" width="28" alt="German"></a>&nbsp;
  <a href="README_el.md"><img src="https://hatscripts.github.io/circle-flags/flags/gr.svg" width="28" alt="Greek"></a>&nbsp;
  <a href="README.md"><img src="https://hatscripts.github.io/circle-flags/flags/gb.svg" width="28" alt="English"></a>&nbsp;
  <a href="README_es.md"><img src="https://hatscripts.github.io/circle-flags/flags/es.svg" width="28" alt="Spanish"></a>&nbsp;
  <a href="README_fr.md"><img src="https://hatscripts.github.io/circle-flags/flags/fr.svg" width="28" alt="French"></a>&nbsp;
  <a href="README_it.md"><img src="https://hatscripts.github.io/circle-flags/flags/it.svg" width="28" alt="Italian"></a>&nbsp;
  <a href="README_nl.md"><img src="https://hatscripts.github.io/circle-flags/flags/nl.svg" width="28" alt="Dutch"></a>&nbsp;
  <a href="README_pl.md"><img src="https://hatscripts.github.io/circle-flags/flags/pl.svg" width="28" alt="Polish"></a>&nbsp;
  <a href="README_pt.md"><img src="https://hatscripts.github.io/circle-flags/flags/pt.svg" width="28" alt="Portuguese"></a>&nbsp;
  <a href="README_sv.md"><img src="https://hatscripts.github.io/circle-flags/flags/se.svg" width="28" alt="Swedish"></a>
</p>

---

![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Tauri](https://img.shields.io/badge/Tauri-24C8D8?style=for-the-badge&logo=tauri&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)

## Overview

FMToolsV2 is a cross-platform desktop application that helps Football Manager players evaluate players, staff, reports, and club infrastructure.

The project is also a practical example of a small product-oriented desktop app: localized UI, user documentation, release packaging, and reproducible release verification.

## Features

- Hidden attribute evaluation using personality, media handling, and determination indicators
- Staff evaluation adapted to Football Manager 26 descriptive attributes
- Scout, coach, and individual training report interpretation
- Club infrastructure evaluation
- Multilingual interface and documentation
- Windows and Linux builds distributed through GitHub Releases

## Screenshots

<p align="center">
  <img src="screenshots/home_en.png" alt="FMToolsV2 home screen" width="600">
</p>

<p align="center">
  <img src="screenshots/reports_en.png" alt="FMToolsV2 reports screen" width="600">
</p>

## Technology Stack

- Svelte and TypeScript for the user interface
- Tauri and Rust for desktop packaging
- Vite for the build pipeline
- svelte-i18n for localization
- GitHub Actions for release automation

## Quality and Release Process

- TypeScript project structure
- `svelte-check` validation through the `npm run check` script
- GitHub Actions release workflow
- SHA256 checksums for release artifacts
- GitHub attestations for build provenance

Verify a downloaded release with:

```bash
gh attestation verify <downloaded-file> --owner Lib-LOCALE
```

## Installation

1. Download the latest version from [Releases](https://github.com/Lib-LOCALE/FMToolsV2/releases/latest).
2. Run the Windows executable or Linux AppImage.

## Credits

Based on community research and work by Gilgiltsu, Kinito, and DoctorDim.

## Related Projects

- [TomatoTask](https://github.com/Lib-LOCALE/TomatoTask)
- [NewGAN-Manager-26](https://github.com/Lib-LOCALE/NewGAN-Manager-26)
