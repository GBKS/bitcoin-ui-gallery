# Bitcoin UI Gallery 🎨

A curated collection of bitcoin wallet user interface designs, showcasing real-world UX patterns and user flows from diverse bitcoin applications. This project serves as a visual resource and inspiration hub for designers working on bitcoin and Lightning Network applications. Another luscious initiative by [Bitcoin Design](https://bitcoin.design).

## ✨ What is this?

The bitcoin UI Gallery is an interactive showcase that helps designers and developers understand how successful bitcoin wallets approach common UX challenges:

- **Real screenshots** from production bitcoin wallets
- **Complete user flows** showing step-by-step interactions
- **Organized by features (tags)** like onboarding, backup, payments, and settings
- **Educational links** connecting to the bitcoin Design Guide
- **Searchable and filterable** interface for quick discovery

## 🎯 Who is this for?

- **Product designers** working on bitcoin applications
- **UX researchers** studying bitcoin user experience patterns
- **Product managers** planning bitcoin wallet features
- **Developers** implementing bitcoin wallet interfaces
- **Design students** learning about financial app design

## 🚀 Features

### Browse by Wallet
Explore complete interface collections from each featured wallet, including their unique design approaches and branding.

### Discover Flows
View complete user journeys like:
- **Onboarding** - First-time user setup and wallet creation
- **Backup & Security** - Recovery phrase management and emergency kits
- **Receiving Bitcoin** - Address generation and QR codes
- **Lightning Payments** - Invoice creation and payment flows
- **Settings & Management** - User preferences and advanced features

### Search & Filter
Find specific screens or patterns by:
- Feature categories (Send, Receive, Backup, etc.)
- Specific UI elements or flows
- Wallet-specific implementations

### Educational Resources
Each flow connects to relevant sections of the [Bitcoin Design Guide](https://bitcoin.design) for deeper understanding of design principles and best practices.

## 🛠 Development Setup

This is a Nuxt.js application built for designers and researchers. Here's how to run it locally:

### Prerequisites
- Node.js (23+) - run "nvm use"
- npm, pnpm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/GBKS/bitcoin-ui-gallery.git
cd bitcoin-ui-gallery

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### Development Server

Start the development server at `http://localhost:3000`:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

### Build for Production

```bash
npm run build
# or
pnpm build
# or
yarn build
```

## 📁 Project Structure

```
app/
├── components/          # Vue components
│   ├── ProjectList.vue  # Wallet project listings
│   ├── ScreenGrid.vue   # Screenshot grid display
│   ├── FlowList.vue     # User flow navigation
│   └── ...
├── data/                # Wallet data and metadata
│   ├── projects.json    # Project index
│   ├── muun.json        # Muun wallet screens and flows
│   └── phoenix.json     # Phoenix wallet screens and flows
├── pages/               # Route components
└── stores/              # Pinia state management

public/
├── screens/             # Wallet screenshot images
│   ├── muun/           # Muun wallet screenshots
│   └── phoenix/        # Phoenix wallet screenshots
└── logos/              # Wallet logos and branding
```

## 🤝 Contributing

We welcome contributions! There are several ways you can help expand this resource:

### 📱 Submit Wallet Screenshots

**The easiest way to contribute is to share materials directly:**

1. **Gather your materials:**
   - High-quality screenshots of key user flows
   - App logo/icon (PNG format preferred)
   - Basic wallet information (name, website, app store links)

2. **Share with us:**
   - **Discord**: Reach out to Christoph in the [Bitcoin Design Discord](https://discord.gg/K7aQ5PErht)
   - **GitHub Issue**: Create an issue with "New Wallet Submission" and attach files

3. **We handle the technical stuff:**
   - Processing and organizing screenshots
   - Creating the data structure
   - Categorizing flows and screens
   - Adding educational links where relevant

### 🛠 Technical Contributions

For developers comfortable with JSON and Git workflows:

**Adding New Wallets:**
1. Fork the repository
2. Add screenshots to `/public/screens/[wallet-name]/`
3. Create a data file in `/app/data/[wallet-name].json` following the existing structure
4. Update `/app/data/projects.json` to include the new wallet
5. Submit a pull request

**Improving Existing Content:**
- Fix categorization and tagging
- Add missing screens or flows
- Improve educational links
- Fix display issues or bugs

### 📋 Submission Guidelines

**Screenshot Requirements:**
- **High resolution** (preferably device-native resolution)
- **Clean captures** without status bar clutter when possible
- **Representative flows** showing key user journeys
- **Current versions** of the application

**Content Focus:**
- **UX patterns** over visual aesthetics
- **Complete user flows** rather than isolated screens
- **Publicly available** interface designs only
- **Educational value** for other designers

**Helpful Information to Include:**
- Wallet name and description
- Platform (iOS/Android/Web)
- Screenshot dates (if known) or app version
- Brief description of each flow
- Any relevant blog posts or documentation

Don't worry about the technical implementation details - we're happy to handle the data structuring and integration work. The most valuable contribution is sharing high-quality screenshots and user flow documentation!

## 📚 Educational Resources

This project complements the [bitcoin Design Guide](https://bitcoin.design), which provides comprehensive guidance on designing bitcoin applications.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Wallet teams for creating excellent user experiences
- [Bitcoin Design Community](https://bitcoin.design) for design guidance
- Open source contributors making bitcoin more accessible

---

*Built with blood, sweat and tears by and for the bitcoin design community*
