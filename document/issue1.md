JavaScript工具库lodash发布了3.5版，成为了npm包仓库中依赖最多的库。它正在摆脱屌丝身份，成为开发者的不二之选。

lodash一开始是Underscore.js库的一个fork，因为和其他(Underscore.js的)贡献者意见相左。John-David Dalton的最初目标，是提供更多“一致的跨浏览器行为……，并改善性能”。之后，该项目在现有成功的基础之上取得了更大的成果，并于一月份发布了3.0版本。

与其前任Underscore一样，lodash的名字也是源于所有函数前面的那个字符。就像jQuery在全部函数前加全局的$一样，lodash使用全局的_来提供对工具的快速访问。例如，要对数组的所有元素执行某个行为，我们可以：

    _.each([1, 2], function(n) { console.log(n); });
    
    
  3.0版包含了新增的47个新方法（如_.camelCase和_.flattenDeep）在内的许多更改。更重要的是对链式方法进行延迟计算：
    
    var users = [
      { 'user': 'barney',  'age': 36 },
      { 'user': 'fred',    'age': 40 },
      { 'user': 'pebbles', 'age': 1 }
    ];
    
    var youngest = _.chain(users)
      .sortBy('age')
      .map(function(chr) {
        return chr.user + ' is ' + chr.age;
      })
      .first()
      .value();
    // → 'pebbles is 1'
    
   在InfoQ的一次采访中，Dalton表示在这些方法中使用延迟计算改进了lodash的性能：
    
   延迟计算意味着在显示或隐式的value()调用之前不会执行链式方法。由于执行被延后了，因此lodash可以进行shortcut fusion这样的优化，通过合并链式iteratee大大降低迭代的次数。
   
   Filip Zawada描述了这一改变对于性能的提升。
   
   最初，lodash只是Underscore的一个复制品，但3.0之后，不会再有针对于Underscore的构建。“尽管我们仍然会运行Underscore/Backbone的单元测试，但lodash 3.0将不再支持单独的Underscore/Backbone构建”，Dalton说。
   
   在过去的一年中，我们看到Underscore根据lodash的API进行了很多调整，因此为Underscore进行单独构建的需求减少了。如果开发者仍然需要兼容某些边缘情况，建议在使用Underscore的同时，用lodash 3.0版中的模块进行补充。
   
   一些主要的npm包都依赖于lodash，如JavaScript转译器Babel、博客平台Ghost，和项目脚手架工具Yeoman。其中Ghost是从Underscore迁移到了lodash。在被InfoQ问及在Ghost中引入lodash时，Ghost的创始人John O'Nolan说到，“这是一个非常明智的选择，它几乎完全是由我们开源开发社区推动的。
   
   我们发现lodash包含更多的功能，更好的性能、恰到好处地使用了semver，并且在Node.js社区（以及其他依赖）中越来越抢眼。
   
   lodash不但深受node.js开发者欢迎，还广泛应用于基于浏览器的项目中。Web开发者可以使用实验构建工具来挑选项目中需要的方法，而不必下载整个库。对于node.js项目，在不需要整个包的时候，可以只include单个方法。
   
   查看英文原文：Lodash, the JavaScript Library You're Already Using
   #https://www.infoq.com/news/2015/03/lodash-utility-library
    