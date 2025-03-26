# react-native-more-sentinal

To track the events

## Installation

```sh
npm install react-native-more-sentinal
```

## Usage


```js
import Sentinal from 'react-native-more-sentinal';

// Initialise the sdk
 Sentinal.init({
    api_key: '',
    url: '',
    env: 'dev',
  });

// set the user id
Sentinal.setUserId('12345')

//track events
 Sentinal.trackEvents(eventName, payload);

```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
