# Intents

Price check intents can be split into several groups:

| Type | Variables | Intents |
| --- | --- | --- |
| Currency items | `{quantity}`, `{name}`, `{league}` | `CurrencyPriceCheckIntent`, `FragmentPriceCheckIntent` |
| Linked items | `{links}`, `{name}`, `{league}` | `UniqueWeaponPriceCheckIntent`, `UniqueWeaponPriceCheckIntent` |
| Skill gems | `{level}`, `{quality}`, `{name}`, `{league}` | `GemPriceCheckIntent` |
| Normal items | `{name}`, `{league}` | `DivinationPriceCheckIntent`, `EssencePriceCheckIntent`, `MapPriceCheckIntent`, `ProphecyPriceCheckIntent`, `UniqueAccessoryPriceCheckIntent`, `UniqueFlaskPriceCheckIntent`, `UniqueJewelPriceCheckIntent`, `UniqueMapPriceCheckIntent` |

All utterances have been generated on [this website](http://www.makermusings.com/amazon-echo-utterance-expander/), and they all follow similar patterns.

## Currency price check intents

### User utterances

```text
{whatis} (/{article}/{quantity}) {<SLOT_NAME>} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}/{quantity}) {<SLOT_NAME>} (/in {league} (/league))
(/{quantity}) {<SLOT_NAME>} (/price) (/in {league} (/league))
(/check) <TYPE> price (/in {league} (/league))
```

### Reprompts

```text
What <TYPE> are you looking for?
What <TYPE> do you want?
What <TYPE> do you want to know the price of?
```

### Reprompt user Utterances

```text
(/{quantity}) {<SLOT_NAME>} (/in {league} (/league)) (/please)
```

## Normal item price check intents

### User utterances

```text
{whatis} (/{article}) {<SLOT_NAME>} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) {<SLOT_NAME>} (/in {league} (/league))
{<SLOT_NAME>} (/price) (/in {league} (/league))
(/check) <TYPE> price (/in {league} (/league))
```

### Reprompts

```text
What <TYPE> are you looking for?
What <TYPE> do you want?
What <TYPE> do you want to know the price of?
```

### Reprompt user Utterances

```text
{<SLOT_NAME>} (/in {league} (/league)) (/please)
```

## Linked item price check intents

### User utterances

```text
{whatis} (/{article}) (/{links} (/link(/ed))) {<SLOT_NAME>} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) (/{links} (/link(/ed))) {<SLOT_NAME>} (/in {league} (/league))
(/{links} (/link(/ed))) {<SLOT_NAME>} (/price) (/in {league} (/league))
(/check) <TYPE> price (/in {league} (/league))
```

### Reprompts

```text
What <TYPE> are you looking for?
What <TYPE> do you want?
What <TYPE> do you want to know the price of?
```

### Reprompt user Utterances

```text
(/{links} (/link(/ed))) {<SLOT_NAME>} (/in {league} (/league)) (/please)
```

## Skill gem price check intents

### User utterances

```text
{whatis} (/{article}) (/(/level) {level}) (/{quality} (/quality)) {<SLOT_NAME>} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) (/(/level) {level}) (/{quality} (/quality)) {<SLOT_NAME>} (/in {league} (/league))
(/(/level) {level}) (/{quality} (/quality)) {<SLOT_NAME>} (/price) (/in {league} (/league))
(/check) <TYPE> price (/in {league} (/league))
```

### Reprompts

```text
What <TYPE> are you looking for?
What <TYPE> do you want?
What <TYPE> do you want to know the price of?
```

### Reprompt user Utterances

```text
(/(/level) {level}) (/{quality} (/quality)) {<SLOT_NAME>} (/in {league} (/league)) (/please)
```

## Quest reward intents

### User utterances

```text
(/{whatis}) (/the) (/quest) reward (/for) (/the) (/{quest}) (/quest)
{quest}
```

### Reprompts

```text
What quest are you looking for?
What is the name of the quest?
Which quest are you looking for?
```

### Reprompt user Utterances

```text
{questName}
{questName} quest
```

## Currency

```text
{whatis} (/{article}/{quantity}) {currency} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}/{quantity}) {currency} (/in {league} (/league))
(/{quantity}) {currency} (/price) (/in {league} (/league))
(/check) currency price (/in {league} (/league))
```

## Fragments

```text
{whatis} (/{article}/{quantity}) {fragment} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}/{quantity}) {fragment} (/in {league} (/league))
(/{quantity}) {fragment} (/price) (/in {league} (/league))
(/check) fragment price (/in {league} (/league))
```

## Unique accessory

```text
{whatis} (/{article}) {uniqueaccessory} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) {uniqueaccessory} (/in {league} (/league))
{uniqueaccessory} (/price) (/in {league} (/league))
(/check) accessory price (/in {league} (/league))
```

## Unique flasks

```text
{whatis} (/{article}) {uniqueflask} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) {uniqueflask} (/in {league} (/league))
{uniqueflask} (/price) (/in {league} (/league))
(/check) flask price (/in {league} (/league))
```

## Unique jewels

```text
{whatis} (/{article}) {uniquejewel} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) {uniquejewel} (/in {league} (/league))
{uniquejewel} (/price) (/in {league} (/league))
(/check) jewel price (/in {league} (/league))
```

## Maps

```text
{whatis} (/{article}) {map} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) {map} (/in {league} (/league))
{map} (/price) (/in {league} (/league))
(/check) map price (/in {league} (/league))
```

## Unique maps

```text
{whatis} (/{article}) {uniquemap} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) {uniquemap} (/in {league} (/league))
{uniquemap} (/price) (/in {league} (/league))
(/check) unique map price (/in {league} (/league))
```

## Essences

```text
{whatis} (/{article}) {essence} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) {essence} (/in {league} (/league))
{essence} (/price) (/in {league} (/league))
(/check) essence price (/in {league} (/league))
```

## Divination cards

```text
{whatis} (/{article}) {divination} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) {divination} (/in {league} (/league))
{divination} (/price) (/in {league} (/league))
(/check) divination price (/in {league} (/league))
```

## Prophecies

```text
{whatis} (/{article}) {prophecy} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) {prophecy} (/in {league} (/league))
{prophecy} (/price) (/in {league} (/league))
(/check) prophecy price (/in {league} (/league))
```

## Unique armours

```text
{whatis} (/{article}) (/{links} (/link(/ed))) {uniquearmour} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) (/{links} (/link(/ed))) {uniquearmour} (/in {league} (/league))
(/{links} (/link(/ed))) {uniquearmour} (/price) (/in {league} (/league))
(/check) armour price (/in {league} (/league))
```

## Unique weapons

```text
{whatis} (/{article}) (/{links} (/link(/ed))) {uniqueweapon} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) (/{links} (/link(/ed))) {uniqueweapon} (/in {league} (/league))
(/{links} (/link(/ed))) {uniqueweapon} (/price) (/in {league} (/league))
(/check) weapon price (/in {league} (/league))
```

## Skill gems

```text
{whatis} (/{article}) (/(/level) {level}) (/{quality} (/quality)) {gem} (/worth) (/in {league} (/league))
(/{whatis}) (/the) price of (/{article}) (/(/level) {level}) (/{quality} (/quality)) {gem} (/in {league} (/league))
(/(/level) {level}) (/{quality} (/quality)) {gem} (/price) (/in {league} (/league))
(/check) gem price (/in {league} (/league))
```
