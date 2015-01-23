# PositionTracker

## About

 Track page's scroll position and store it into a storage


## Usage

Basic usage is as follows:


Once you register regular expression of url, when you leave the page,
it will save scroll position of the page that has url that matches the regular expression.

```javascript
  app.run(['positionTrackerService', function(positionTrackerService){
  
  positionTrackerService.
      registerUrlExp(/first/). 
      registerUrlExp(/second/)
}]);
```

Or you can manullay store page's scroll position

```javascript
positionTrackerService.setPosition(x:1, y:1000, url:'/first'}
}]);
```

You can also customize where scroll position data going to be stored
```javascript
positionTrackerService.config({storage:localStorage})//sessionStorage is default
```

For advanced usage, see the documentation which doesn't exist yet.


## Contributing

We'll check out your contribution if you:

* Provide a comprehensive suite of tests for your fork.
* Have a clear and documented rationale for your changes.
* Package these up in a pull request.

We'll do our best to help you out with any contribution issues you may have.

## License

MIT. See `LICENSE.txt` in this directory.
