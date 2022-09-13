import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchnFilter.css";
import Data from "../../data/events.json";
function SearchnFilter({ data, setdata }) {
  const [highlightvalue, sethighlightvalue] = useState();
  const [searchtxt, setsearchtxt] = useState("");
  const [mobileView, setmobileView] = useState(window.innerWidth < 600);

  const updateMedia = () => {
    setmobileView(window.innerWidth < 600);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  let changeFilter = (filter) => {
    var newData = [];
    switch (filter) {
      case "Upcoming":
        newData = Data.filter((d) => {
          var parts = d.startDate.split("/");
          var eventDate = new Date(parts[2], parts[1] - 1, parts[0]);
          var currDate = new Date();
          return currDate < eventDate;
        });
        console.log(newData);
        break;
      case "Ongoing":
        newData = Data.filter((d) => {
          var parts = d.startDate.split("/");
          var part = d.startDate.split("/");
          var startDate = new Date(parts[2], parts[1] - 1, parts[0]);
          var endDate = new Date(part[0], part[1] - 1, part[2]);
          var currDate = new Date();
          return currDate >= startDate && currDate <= endDate;
        });
        break;
      case "Ended":
        newData = Data.filter((d) => {
          var parts = d.startDate.split("/");
          var eventDate = new Date(parts[2], parts[1] - 1, parts[0]);
          var currDate = new Date();
          return currDate > eventDate;
        });
        break;
      case "inPerson":
        newData = Data.filter((d)=> d.location==="In-Person")
        break;
      case "online":
        newData = Data.filter((d)=>d.location==="online")
        break;
      default:
        newData = [];
    }
    setdata(newData);
  };
  let handlesearch = (e) => {
    console.log(e.target.value);
    setsearchtxt(e.target.value);
    if (e.target.value !== "") {
      const modified = Data.filter(
        (itm) =>
          itm.name &&
          itm.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      // console.log(modified)
      setdata(modified);
    } else {
      setdata(Data);
    }
  };

  console.log(highlightvalue);
  return (
    <div className="SearchnFilter-maindiv">
      {mobileView === false ? (
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div className="Events-searchbox">
            <input
              type="text"
              className="Events-serchbar"
              onChange={handlesearch}
              value={searchtxt}
              placeholder="Search"
            ></input>
            <BsSearch></BsSearch>
          </div>

          <p
            className="Events-headerp"
            onClick={() => {
              sethighlightvalue("Upcoming");
              changeFilter("Upcoming");
            }}
            id={highlightvalue === "Upcoming" ? "Events-selected" : ""}
          >
            Upcoming
          </p>
          <p
            className="Events-headerp"
            onClick={() => {
              sethighlightvalue("Ongoing");
              changeFilter("Ongoing");
            }}
            id={highlightvalue === "Ongoing" ? "Events-selected" : ""}
          >
            Ongoing
          </p>
          <p
            className="Events-headerp"
            onClick={() => {
              sethighlightvalue("Ended");
              changeFilter("Ended");
            }}
            id={highlightvalue === "Ended" ? "Events-selected" : ""}
          >
            Ended
          </p>
          <div className="location-filter">
            <p style={{ fontWeight: "700", color: "black" }}>Location</p>
            <p
              className="lcfilters"
              onClick={() => {
                sethighlightvalue("inPerson");
                changeFilter("inPerson");
              }}
              id={highlightvalue === "inPerson" ? "Events-selected" : ""}
            >
              In-Person
            </p>
            <p
              className="lcfilters"
              onClick={() => {
                sethighlightvalue("online");
                changeFilter("online");
              }}
              id={highlightvalue === "online" ? "Events-selected" : ""}
            >
              Online
            </p>
          </div>
        </div>
      ) : (
        <div className="SearchnFilter-mobileview">
          <div style={{ display: "flex" }}>
            <p
              className="Events-headerp"
              style={{ marginLeft: "0" }}
              onClick={() => {
                sethighlightvalue("Upcoming");
                changeFilter("Upcoming");
              }}
              id={highlightvalue === "Upcoming" ? "Events-selected" : ""}
            >
              Upcoming
            </p>
            <p
              className="Events-headerp"
              onClick={() => {
                sethighlightvalue("Ongoing");
                changeFilter("Ongoing");
              }}
              id={highlightvalue === "Ongoing" ? "Events-selected" : ""}
            >
              Ongoing
            </p>
            <p
              className="Events-headerp"
              onClick={() => {
                sethighlightvalue("Ended");
                changeFilter("Ended");
              }}
              id={highlightvalue === "Ended" ? "Events-selected" : ""}
            >
              Ended
            </p>
            <select
              className="Events-headerp"
              onClick={() => sethighlightvalue("")}
              id={highlightvalue === "Filter" ? "Events-selected" : ""}
            >
              <option value="Location">Location</option>
              <option value="Online">Online</option>
            </select>
          </div>
          <div className="Events-searchbox">
            <input
              type="text"
              className="Events-serchbar"
              onChange={handlesearch}
              value={searchtxt}
              placeholder="Search"
            ></input>
            <BsSearch></BsSearch>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchnFilter;
