---
title: Observing Live connectivity status in Jetpack Compose way!
description: Let’s see how to observe connectivity in Jetpack Compose way 🚗
date:   2021-08-17
categories:
  - android
tags:
  - Android
  - AndroidDev
  - Kotlin
  - JetPack
author: Shreyas Patil
image: /images/blog/banner/observing-live-connectivity-status-in-jetpack-compose-way.webp
thumbnail: https://via.placeholder.com/150
url: android/2021/08/17/observing-live-connectivity-status-in-jetpack-compose-way.html
---

Hey Composers 👋, there are very rare mobile applications in today’s world that don’t use Internet connectivity for the execution of business. It’s now almost the need of every app. Also, some apps provide offline capabilities in the application so users can still interact with the app even if connectivity is not present.

While developing such apps, we also need to show the network status in the app so that users can aware of the current situation and can act accordingly. It becomes needed to show network status if connectivity changes from connected to a not-connected state and vice versa. In this article, we’ll implement live connectivity status and showing it in Jetpack Compose in its own beautiful way!

🏃Get Started
-------------

So let’s start the implementation. Considering you have created a boilerplate setup of the Jetpack Compose application, let’s directly move to the main part of the application.

Core utilities
--------------

First of all, let’s create core utilities for observing the network connectivity. Add a sealed model for holding connectivity status details as follows.

{{< gist PatilShreyas 8d751a4c397967526900b5c146d47958 >}}

Sometimes, we don’t need to observe connectivity but we need to know the status of connectivity in a single shot. So let’s create a utility for **_getting the current connectivity status_**.

{{< gist PatilShreyas 147f44e8e92322c9aa183a03f1e57ccd >}}

This way, we can check if the current network having internet capability or not. Here, we created a separate function `getCurrentConnectivityState()` for re-usability purposes (_we’ll see its usage_).

Now, on `Context` instance, we can directly access the current connectivity status by accessing `_currentConnectivityState_` _extension member_ which we just created 👆.

Now, let’s create a utility for observing _LIVE_ 🔴 network connectivity changes!

{{< gist PatilShreyas 605d2f69419f72c97cb89a2a819c51bb >}}

Here, we are using [callbackFlow{}](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/callback-flow.html), which is a cold🌊 stream by which we can _remove observer on cancellation_ with `awaitClose()` as you can see. Once we start collecting flow, live updates of the connectivity state will be sent over this flow and updates will be unregistered once the flow collector _cancels the subscription_.

Now we are done with the core utility needs.

Compose utilities
-----------------

Now let’s start developing Compose utilities for observing connectivity changes. In the previous part, we created core Android utilities. Since we want to use it in our Compose application, we need to convert it for Compose. Also, we are using `Flow` for observing connectivity, we need to leverage coroutines here.

For this, we’ll utilize [produceState()](https://developer.android.com/reference/kotlin/androidx/compose/runtime/package-summary#produceState(kotlin.Any,kotlin.coroutines.SuspendFunction1)), which launches coroutine scoped to the Composition which holds the [State](https://developer.android.com/reference/kotlin/androidx/compose/runtime/State). It’ll be automatically get cancelled once it leaves the composition.

{{< gist PatilShreyas 1c996240c3bbf492d848ffa55b351b7c >}}

As you can see, we created a Composable function that returns the Connectivity state. In the `produceState()`, we are subscribing to the previously created core utility `Flow` and setting **_State_**’s value on collecting every connectivity state.

> Note: Under the hood, `produceState` makes use of other effects! It holds a `result` variable using `remember { mutableStateOf(initialValue) }`, and triggers the `producer` block in a `LaunchedEffect`. Whenever `value` is updated in the `producer` block, the `result` state is updated to the new value. ([reference](https://developer.android.com/jetpack/compose/side-effects#producestate)).

We are done with the development of composable utility

Usage in Compose
----------------

Thus, the utility is now ready to be used in the Compose functions. Just plug it and see magic 👽. On UI, you can use it like 👇

{{< gist PatilShreyas 2f9fb4cc66c3bd945dd1c1cb28644a2a >}}

Yep, that’s it😍. You can see its actual usage in one of my projects i.e. [NotyKT](https://github.com/PatilShreyas/NotyKT/pull/210). Here’s the sample outcome of this from the above-mentioned project.

![](https://miro.medium.com/max/1200/1\*18X\_aTNszEmyhMoQaB11Ow.gif)


> **Note:** Here, I’ve simulated network connectivity change with the help of emulator extended controls without using system drawer since I’m showing the change in the top part of the application).

I hope you enjoyed reading this article and you liked it 😄.

_“Sharing is caring!”_

Thank you! 😃

📚 Resources
------------

*   [Repository](https://github.com/PatilShreyas/NotyKT)

*   [Pull request of a change](https://github.com/PatilShreyas/NotyKT/pull/210)

*   [ConnectivityManager API](https://developer.android.com/reference/android/net/ConnectivityManager)
*   [Side effect | Jetpack Compose | Android Developers](https://developer.android.com/jetpack/compose/side-effects#producestate)
