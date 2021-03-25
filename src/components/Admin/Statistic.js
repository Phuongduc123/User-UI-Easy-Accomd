import { Button, Menu, Popover, Table } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Aside from "./Aside";
import * as React from 'react';
import { createChart } from 'lightweight-charts';
import { useEffect, useState } from "react";
import {
    ConfirmedReview,
  getConfirmedReviewList,
  getStatisTic,
  getUnconfirmedHostList,
  putAllowUpdate,
} from "../../request";
import { useHistory, useLocation } from "react-router";

const { SubMenu } = Menu;
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

//unconfirmedHostList
function Statistic() {
  //state
  const location= useLocation() 
  const [data,setData] = useState([]) 
  const [arrData,setArrData] = useState([])
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  //hook
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
    getStatisTic({id:location?.state?.id},setData)
  },[])

  useEffect(()=>{
    const fakeArrData=[]
    data.map(dt=>{
        fakeArrData.push({time:dt[0],value:dt[1]})
    })
    setArrData(fakeArrData)
  },[data])


  useEffect(()=>{
    console.log(arrData)
  },[arrData])

  return (
    <div className="Statistic" style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Aside selectedKeys={"6"}/>
      </div>
      <div style={{ padding: "20px", flex: 6 }}>
        {<LightweightChart data={arrData} id={location?.state?.id} width={windowDimensions.width *0.75}/>}
      </div>
    </div>
  );
}

export default Statistic;


class LightweightChart extends React.PureComponent  {
    constructor(props){
        super(props)
        this.containerId = `lightweight_chart_container`;
    }

    chart = null;

    componentDidUpdate() {
        console.log(this.props.data)
        if(this.props.data.length!==0){
            const chart = createChart(this.containerId, { width: this.props.width, height: 500 });
            this.chart = chart;
            const lineSeries = chart.addLineSeries();
            lineSeries.setData(
                this.props.data
            );
    
            chart.timeScale().fitContent();
        }
       
        
    }

	componentWillUnmount() {
		if (this.chart !== null) {
			this.chart.remove();
			this.chart = null;
		}
	}

	render() {
		return (
			<div
				id={ this.containerId}
				className={ 'LightweightChart' }
			/>
		);
	}
}
