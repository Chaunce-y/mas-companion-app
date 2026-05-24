# Margaritaville at Sea Companion App MVP

An unofficial fan-built companion app concept and portfolio prototype inspired by the guest experience aboard Margaritaville at Sea.

This is not an official Margaritaville at Sea product, is not affiliated with Margaritaville at Sea, and does not use official systems, accounts, bookings, payments, or APIs.

## What the MVP does

The Version 1 MVP focuses on a simple onboard guest loop:

- Open the app and see a trip overview
- Browse the day schedule
- Add and remove events from My Plan
- Keep My Plan saved locally between app launches
- Discover dining venues, hours, cost labels, and menu previews
- Open dining detail modals
- Jump from events or dining into a deck/location guide
- View trip/account details and simple persisted preferences

## Tech stack

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage for local persistence
- Static local seed data for events, dining, locations, and trip details

## Run locally

Install dependencies if needed:

```bash
npm install
```

Start Expo:

```bash
npm run start
```

Run platform targets:

```bash
npm run ios
npm run android
npm run web
```

Quality checks:

```bash
npm run lint
npm run typecheck
```

## MVP feature checklist

Home:

- Trip overview
- Sailing/day context
- Happening Now section
- Coming Up section
- My Plan preview
- Useful empty state when no plan exists

Schedule:

- 8-12 realistic static cruise events
- Event categories, times, locations, and descriptions
- Live / next / upcoming / past status labels
- Add/remove events from My Plan
- First-class My Plan panel at the top of the schedule

Dining:

- 6-8 dining venues
- Category and cost labels
- Open / closed / opening soon / closing soon status logic
- Menu preview modal
- Location links into the deck guide
- Empty state when nothing is open

Deck Guide:

- Locations grouped by deck through deck filters
- Highlighted selected/focused location
- Useful location cards
- Same-deck context for nearby places

Account:

- Guest and trip details
- Itinerary, sailing, cabin placeholder, reservation placeholder, party size
- Persisted preferences for reminders, dining alerts, and offline onboard data

## Telegram progress updates

A lightweight local progress script is included. It is optional and safely skips if credentials are missing.

1. Create a Telegram bot with BotFather.
2. Copy the bot token.
3. Get your chat ID. One simple route is to message your bot, then visit:

```text
https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
```

4. Create a local `.env` file. Do not commit it.

```bash
cp .env.example .env
```

5. Fill in:

```bash
TELEGRAM_BOT_TOKEN=your-token-here
TELEGRAM_CHAT_ID=your-chat-id-here
```

6. Send a local progress message:

```bash
npm run progress -- "MAS MVP: local progress test."
```

## Known limitations

- Static local data only; no backend or official cruise data integration
- No authentication
- No booking, payment, reservation, or official account features
- No push notifications
- No real indoor navigation
- No screenshots included yet
- Manual Expo/iOS/Android smoke testing is still required before calling the demo final

## Future roadmap ideas

- Add screenshots and a short portfolio case-study section
- Add utility tests for time, schedule, dining, and storage helpers
- Add richer multi-day itinerary support
- Add a dedicated My Plan tab if the plan grows beyond the schedule screen
- Add real map artwork or deck imagery using safe, non-official assets
- Add accessibility pass for screen-reader labels and contrast
