import React, { useRef, useImperativeHandle } from 'react';
import logo from './logo.svg';
import './App.css';

function Test(props,testRef) {
  useImperativeHandle(testRef, () => {
    return {
      method() {
        console.log("Test Component Method 方法调用了");
        return "何冲很帅"
      }
    }
  }, [])
  return (
  <>
   <div ref={testRef}>哈哈哈</div>
    <div onClick={ () => {
      console.log(testRef.method())
    }}>我是Test组件</div>
  </>
  )
}

/**
 * 需求1: 获取Test组件内react的dom元素 
 * forWardRef(): 传入一个组件获得一个新的组件
 * 要求:Test组件必须写两个形参 props(组件的属性) 和 Ref(转发源对象)
 * 
 * 需求2: 获取Test函数组件内的方法
 * useImperativeHandle(转发源对象, ()=>{}, []): 参数一: 父组件传来的ref源对象 参数二: 回调函数返回一对象(包含函数组件的方法) 参数三: 依赖项
 *  参数三说明: 如果使用了依赖项，则第一次调用后，会进行缓存，只有依赖项发生变化时才会重新调用函数
 * 作用：用于获取函数组件内的方法
 * 
 */
const TestRef = React.forwardRef(Test)

function App() {
  const testRef = React.createRef();
  const getRef = () => {
    // 调用Test里的Method方法
    console.log(testRef.current.method())
  }
  return (
    <div>
      <TestRef ref={testRef}/>
      <div >何冲很帅哈</div>
      <button onClick={getRef}>点击获取ref绑定的dom</button>
    </div>
  );
}

export default App;
