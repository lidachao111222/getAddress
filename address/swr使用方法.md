# swr使用方法





## 用途

With SWR, components will get a stream of data updates **constantly** and **automatically**.
And the UI will be always **fast** and **reactive**.





## 用法



![](https://pic3.zhimg.com/80/v2-63b1d99d93454968deed1b28fa2bd7b2_720w.jpg)



Demo:

```javascript
import useSWR from 'swr'
function Profile() {
  const { data, error } = useSWR('/api/user', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```



```useSWR``` 接受两个参数 ：

第一个是key ，输入的是string类型。 通常是api的 url。

第二个参数是fetcher， 有点像是axios。 相当于 异步 方法用来返回数据。、



### 有多个参数任选

```const { data, error, isValidating, mutate } = useSWR(key, fetcher, options)```







如果使用其他library的话  （如fetch，axios, graphql, ethers）

使用之前需要先封装一个library的方法。



### 使用`fetch`

```javascript
const fetcher = (...args) => fetch(...args).then(res => res.json())

or 

import fetch from 'unfetch'
const fetcher = url => fetch(url).then(r => r.json())
function App () {
  const { data, error } = useSWR('/api/data', fetcher)
  // ...
}
```



### 使用axios

```javascript
import axios from 'axios'
const fetcher = url => axios.get(url).then(res => res.data)
function App () {
  const { data, error } = useSWR('/api/data', fetcher)
  // ...
}
```



### 使用graphql

```javascript
import { request } from 'graphql-request'
const fetcher = query => request('https://api.graph.cool/simple/v1/movies', query)
function App () {
  const { data, error } = useSWR(
    `{
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }`,
    fetcher
  )
  // ...
}

```



### 使用ethersjs

```javascript
const fetcher = (library) => (...args) => {
  const [method, ...params] = args;
  console.log(method, params);
  return library[method](...params);
};


 const { account, library } = useWeb3React<Web3Provider>();
 const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });
```









使用[web3-react](https://github.com/NoahZinsmeister/web3-react)软件包与以太坊区块链进行通信。`web3-react`确保某些关键数据（用户帐户，他们所使用的网络等）保持最新状态。它使用[上下文](https://reactjs.org/docs/context.html)有效地存储此数据，并使用`useWeb3React`挂钩将其注入到应用程序中您需要的任何位置。