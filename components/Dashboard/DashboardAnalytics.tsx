import React, { useEffect, useLayoutEffect, useState } from "react";
import { VscInfo } from "react-icons/vsc";
import { Line, Area, Pie, measureTextWidth } from "@ant-design/plots";
import { useGetAnalytics } from "api/analytics";
import { FiFilter } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import { countries } from "data/countries";
const data = [
  {
    type: "分类一",
    value: 27,
  },
  {
    type: "分类二",
    value: 25,
  },
  {
    type: "分类三",
    value: 18,
  },
  {
    type: "分类四",
    value: 15,
  },
  {
    type: "分类五",
    value: 10,
  },
  {
    type: "其他",
    value: 5,
  },
];

const colors10 = ["#599EEA", "#844FF6", "#F09468", "#FAB70A", "#0FB77A"];

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const DashboardAnalytics = () => {
  const filters = [
    "1 Day",
    "3 Days",
    "7 Days",
    "30 Days",
    "All Time",
    "Custom Date",
  ];

  interface DataItem {
    scales: number;
    Date: string;
  }

  interface DataItems extends Array<DataItem> {}

  const [activeFilter, setActiveFilter] = useState<String>("All Time");
  const [analytics, setAnalytics] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [locationAnalytics, setLocationAnalytics] = useState([]);
  const [countryObjs, setCountryObjs] = useState([]);
  const [brandObjs, setBrandObjs] = useState([]);
  const [width, height] = useWindowSize();

  const [brandAnalytics, setBrandAnalytics] = useState([]);

  const { data: dataResp } = useGetAnalytics();

  const config = {
    padding: 0,
    data: locationAnalytics,
    angleField: "percent",
    colorField: "country",
    radius: 0.7,
    innerRadius: 0.6,
    legend: {
      position: "bottom",
      layout: "vertical",
      offsetY: 10,
      offsetX: 40,
    },
    theme: {
      colors10,
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: null,
      content: {
        style: {
          whiteSpace: "pre-wrap",

          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "",
      },
    },
  };

  const config2 = {
    padding: 0,
    data: brandAnalytics,
    angleField: "percent",
    colorField: "source",
    radius: 0.7,
    innerRadius: 0.6,
    legend: {
      position: "bottom",
      layout: "vertical",
      offsetY: 10,
      offsetX: 40,
    },
    theme: {
      colors10,
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: null,
      content: {
        style: {
          whiteSpace: "pre-wrap",

          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "",
      },
    },
  };

  useEffect(() => {
    if (!!dataResp && dataResp?.status === 200) {
      setAnalytics(dataResp?.data);
      setLocationAnalytics(dataResp?.data?.top_locations);
      setBrandAnalytics(dataResp?.data?.top_sources);

      let graphData = dataResp?.data?.graph_data?.views;
      if (!!graphData && Object?.keys(graphData)?.length > 0) {
        graphData = Object.entries(graphData)?.map((item) => {
          let date = `${new Date(item[0])}`;
          date = date?.slice(3, 10);
          return { date, value: item[1] };
        });

        setGraphData(graphData);
      }
    }
  }, [dataResp]);

  useEffect(() => {
    if (!!locationAnalytics && locationAnalytics?.length > 0) {
      let locations = [];
      countries?.forEach((country) => {
        locationAnalytics?.forEach((item, i) => {
          if (item.country === country?.name) {
            const location = {
              ...item,
              color: colors10[i],
              code: country.code,
            };
            locations?.push(location);
          }
        });
      });
      setCountryObjs(locations);
    }

    if (!!brandAnalytics && brandAnalytics?.length > 0) {
      let brands = [];

      brandAnalytics?.forEach((item, i) => {
        const brand = {
          ...item,
          src: `/img/${item?.source}.png`,
          color: colors10[i],
        };
        brands?.push(brand);
      });
      setBrandObjs(brands);
    }
  }, [locationAnalytics, brandAnalytics, countries]);
  return (
    <div>
      <div className="py-5 gap-3 hidden sm:flex">
        {filters?.map((filter) => (
          <div
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border-[1px] border-[##EFF1F6] py-3 px-4 text-sm font-medium cursor-pointer ${
              filter === activeFilter
                ? "text-primary bg-primaryTrans border-primary"
                : "text-gray-500"
            }`}
          >
            {filter}
          </div>
        ))}
      </div>

      <div className="relative sm:hidden z-0 ">
        <button
          className="my-4 shadow-sm border-[1px] border-[#EFF1F6] rounded-md px-8 py-2 font-medium text-gray-400 flex gap-2 items-center"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
          {showFilter ? <MdClose /> : <FiFilter />}
        </button>
        {showFilter && (
          <div className="py-5 gap-3 absolute top-12 left-12 w-[220px]  bg-white z-10 px-6 border-[1px] border-[#EFF1F6] shadow-md">
            {filters?.map((filter) => (
              <div
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full py-2  text-sm font-medium cursor-pointer hover:text-primary ${
                  filter === activeFilter ? "text-primary" : "text-gray-500"
                }`}
              >
                {filter}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="analytics-card">
        <div className="flex justify-between items-center">
          <div className="">
            <p className="font-bold text-gray-300 text-base md:text-lg">
              Page Views
            </p>
            <p className="mt-2 text-gray-400 text-sm">{activeFilter}</p>
          </div>
          <VscInfo className="text-base md:text-xl text-gray-400 cursor-pointer " />
        </div>

        <h3 className="font-bold text-2xl md:text-4xl lg:text-[48px] text-gray-300">
          500
        </h3>

        <div className="overflow-x-auto">
          <Area
            className="mt-12"
            data={graphData}
            color="#FF5403"
            padding="auto"
            xField={"date"}
            meta={{ count: { min: 0 } }}
            yField="value"
            yAxis={{ grid: null }}
            xAxis={{ grid: null }}
            areaStyle={() => {
              return {
                fill: "l(270) 0:#FF540300 0.5:#FF540333 1:#FF5403",
              };
            }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6 ">
        <div className="analytics-card grid md:grid-cols-2">
          <div className="md:col-span-2 flex items-center">
            <h4 className="text-lg font-bold text-black-300">Top Locations</h4>
            <p className="text-primary font-medium cursor-pointer text-sm ml-auto">
              View full reports
            </p>
          </div>
          <div className="my-auto mx-auto md:mx-0 order-1 md:order-[0]">
            {!!countryObjs &&
              countryObjs?.length > 0 &&
              countryObjs?.map((country) => (
                <div
                  key={country?.country}
                  className="flex gap-2 items-center my-4 "
                >
                  <ReactCountryFlag
                    countryCode={country?.code}
                    svg
                    className="text-base rounded"
                  />
                  <p className="text-sm">
                    {country?.country}{" "}
                    <span className="font-semibold">{country.percent}%</span>
                  </p>
                  <span
                    style={{
                      backgroundColor: country?.color,
                    }}
                    className={`rounded-full  w-2 h-2 `}
                  ></span>
                </div>
              ))}
          </div>
          <Pie
            {...config}
            style={{ height: "200px" }}
            label={false}
            legend={false}
          />
        </div>
        <div className="analytics-card grid md:grid-cols-2">
          <div className="md:col-span-2 flex items-center">
            <h4 className="text-lg font-bold text-black-300">Top Locations</h4>
            <p className="text-primary font-medium cursor-pointer text-sm ml-auto">
              View full reports
            </p>
          </div>
          <div className="my-auto mx-auto md:mx-0 order-1 md:order-[0]">
            {!!brandObjs &&
              brandObjs?.length > 0 &&
              brandObjs?.map((brand) => (
                <div
                  key={brand?.source}
                  className="flex gap-2 items-center my-4 "
                >
                  <img src={brand?.src} width="18px" alt="" />
                  <p className="text-sm capitalize">
                    {brand?.source}{" "}
                    <span className="font-semibold">{brand.percent}%</span>
                  </p>
                  <span
                    style={{
                      backgroundColor: brand?.color,
                    }}
                    className={`rounded-full  w-2 h-2 `}
                  ></span>
                </div>
              ))}
          </div>
          <Pie
            {...config}
            style={{ height: "200px" }}
            label={false}
            legend={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
