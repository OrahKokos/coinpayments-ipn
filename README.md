# Coinpayments-IPN


<p align="left">
  <a href="https://github.com/OrahKokos/coinpayments-ipn/actions/workflows/ci.yml/badge.svg">
    <img src="https://github.com/OrahKokos/coinpayments-ipn/actions/workflows/ci.yml/badge.svg"
         alt="build status">
  </a>
  <a href="https://codecov.io/github/OrahKokos/coinpayments-ipn">
    <img src="https://codecov.io/github/OrahKokos/coinpayments-ipn/coverage.svg?branch=master"
         alt="code coverage">
  </a>
</p>

![alt text](https://www.coinpayments.net/images/logo.png "CoinPayments")

Module for verifing Coinpaymets Instant Payment notifications.

## Content
  - [Installation](#installation)
  - [Usage](#usage)
  - [Helpers](#helpers)
    - [Type](#helper-by-type)
      - [isSimpleButtonIPN](#isSimpleButtonIPN)
      - [isAdvancedButtonIPN](#isAdvancedButtonIPN)
      - [isDonationButtonIPN](#isDonationButtonIPN)
      - [isCartIPN](#isCartIPN)
      - [isDepositIPN](#isDepositIPN)
      - [isWithdrawalIPN](#isWithdrawalIPN)
      - [isApiIPN](#isApiIPN)
    - [Payment]($helper-by-payment)
      - [isPaymentSuccessful](#isPaymentSuccessful)
        - [Deposit](#isPaymentSuccessful-deposit)
        - [Withdrawal](#isPaymentSuccessful-withdrawal)
        - [Everything else](#isPaymentSuccessful-else)
      - [isPaymentUnsuccessful](#isPaymentUnsuccessful)
      - [isPaymentPending](#isPaymentPending)
      - [isPaymentComplete](#isPaymentComplete)


<a name="installation"></a>

## Installation

```bash
npm install coinpayments-ipn
yarn add coinpayments-ipn
```

<a name="usage"></a>

## Basic Usage
```typescript
import { isIPNLike, verifyIPN } = 'coinpayments-ipn'

// Fetch IPN data from post request - not provided by lib
const someReceivedPayload = getPOSTDataForIPNUrl() 
// Fetch IPN HMAC from request header - not provided by lib
const givenHMAC = getHMACFromPOSTHeader() 

if (!isIPNLike(someReceivedPayload)) {
  // Notification is not the correct shape
  // Discard to faulty IPNs or ignore
}
someReceivedPayload // type narrowed -> CoinpaymentsIPNLike

// Fetch ipnSecret for merchant - not provided by lib
const merchantIPNSecret = resolveMerchantIPNSecret(someReceivedPayload.merchant) 

// Generate hmac based on ipnSecret and given payload and compare given hmac
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)

if (!result.success) {
  // result.error for more info
}
result.data // CoinpaymentsIPN - Verified

```
<a name="helpers"></a>

## Helper functions

<a name="helpers-by-type"></a>

### Type

<a name="isSimpleButtonIPN"></a>

#### isSimpleButtonIPN
```typescript
import { isSimpleButtonIPN } from 'coinpayments-ipn'

...
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)
if (result.success) {
  if (isSimpleButtonIPN(result.data)) {
    result.data // SimpleButtonIPN
  }
}
```
<a name="isAdvancedButtonIPN"></a>

#### isAdvancedButtonIPN
```typescript
import { isAdvancedButtonIPN } from 'coinpayments-ipn'

...
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)
if (result.success) {
  if (isAdvancedButtonIPN(result.data)) {
    result.data // AdvancedButtonIPN
  }
}

```
<a name="isDonationButtonIPN"></a>

#### isDonationButtonIPN
```typescript
import { isDonationButtonIPN } from 'coinpayments-ipn'

...
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)
if (result.success) {
  if (isDonationButtonIPN(result.data)) {
    result.data // DonationButtonIPN
  }
}
```
<a name="isCartIPN"></a>

#### isCartIPN
```typescript
import { isCartIPN } from 'coinpayments-ipn'

...
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)
if (result.success) {
  if (isCartIPN(result.data)) {
    result.data // CartIPN
  }
}
```
<a name="isDepositIPN"></a>

#### isDepositIPN
```typescript
import { isDepositIPN } from 'coinpayments-ipn'

...
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)
if (result.success) {
  if (isDepositIPN(result.data)) {
    result.data // DespositIPN
  }
}
```
<a name="isWithdrawalIPN"></a>

#### isWithdrawalIPN
```typescript
import { isWithdrawalIPN } from 'coinpayments-ipn'

...
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)
if (result.success) {
  if (isWithdrawalIPN(result.data)) {
    result.data // WithdrawalIPN
  }
}
```

<a name="isApiIPN"></a>

#### isApiIPN
```typescript
import { isApiIPN } from 'coinpayments-ipn'

...
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)
if (result.success) {
  if (isApiIPN(result.data)) {
    result.data // ApiIPN
  }
}
```

<a name="helper-by-payment"></a>

### Payment

<a name="isPaymentSuccessful"></a>

#### isPaymentSuccessful 
<a name="isPaymentSuccessful-deposit"></a>

##### Deposit
```typescript
import { isDepositIPN, isPaymentSuccessful } from 'coinpayments-ipn'

...
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)
if (result.success) {
  if (isDepositIPN(result.data)) {
    result.data // DespositIPN -> { fee?: string, feei?: string, fiat_fee?: string, fiat_feei?: string }
    if (isPaymentSuccessful(result.data)) {
      result.data // DespositIPN & { fee: string, feei: string, fiat_fee: string, fiat_feei: string }
    }
  }
}

```
<a name="isPaymentSuccessful-withdrawal"></a>

##### Withdrawal
```typescript
import { isWithdrawalIPN, isPaymentSuccessful } from 'coinpayments-ipn'

...
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)
if (result.success) {
  if (isWithdrawalIPN(result.data)) {
    result.data // WithdrawalIPN
    if (isPaymentSuccessful(result.data)) {
      result.data // WithdrawalIPN - no additional
    }
  }
}

```

<a name="isPaymentSuccessful-else"></a>

##### Everything else
Any other beside Withdrawals and Deposits should expect the following result. ApiIPN is used as an example.
```typescript
import { isApiIPN, isPaymentSuccessful } from 'coinpayments-ipn'

...
const result = verifyIPN(merchantIPNSecret)(givenHMAC)(someReceivedPayload)
if (result.success) {
  if (isApiIPN(result.data)) {
    result.data // ApiIPN -> { send_tx?: string, received_amount?: string, received_confirms?: string }
    if (isPaymentSuccessful(result.data)) {
      // only when status >= 100
      result.data // ApiIPN & { send_tx: string, received_amount: string, received_confirms: string }
    }
  }
}

```

