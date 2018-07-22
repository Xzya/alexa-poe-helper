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
(/{whatis} {article}) price of (/{article}/{quantity}) {<SLOT_NAME>} (/in {league} (/league))
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
(/{whatis} {article}) price of (/{article}) {<SLOT_NAME>} (/in {league} (/league))
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
(/{whatis} {article}) price of (/{article}) (/{links} (/link(/ed))) {<SLOT_NAME>} (/in {league} (/league))
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
(/{whatis} {article}) price of (/{article}) (/(/level) {level}) (/{quality} (/quality)) {<SLOT_NAME>} (/in {league} (/league))
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
