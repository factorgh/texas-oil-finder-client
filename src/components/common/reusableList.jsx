/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const ReusableList = ({ title, prefix }) => {
  const [highestCounty, setHighestCounty] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const naviagte = useNavigate();
  const handleNavigate = (id) => {
    naviagte(`/details/${prefix}`, { state: { id } });
  };

  const fetchHighestCounty = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/counties/");

      setHighestCounty(res.data);
    } catch (err) {
      console.error(err.message);
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHighestCounty();
  }, []);

  return (
    <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 2, p: 2 }}>
      <Typography variant="h6" fontWeight="bold " sx={{ mb: 2 }}>
        {title}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {isLoading && <CircularProgress />}
      <InfiniteScroll
        dataLength={highestCounty.length}
        hasMore={highestCounty.length < 50}
        loader={
          <CircularProgress
            size={24}
            sx={{ display: "block", mx: "auto", my: 2 }}
          />
        }
        endMessage={
          <Divider sx={{ mt: 2 }}>It is all, nothing more 🤐</Divider>
        }
      >
        <List
          sx={{
            maxHeight: 600,
            overflow: "auto",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          {highestCounty.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                bgcolor: index % 2 === 0 ? "#f5f5f5" : "#fff",
                borderRadius: 1,
                mb: 1,
                color: "#2b6cb0",
              }}
            >
              <ListItemText
                onClick={() => {
                  handleNavigate(item.id);
                }}
                sx={{ color: "#2b6cb0", cursor: "pointer" }}
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name.split(" ")[0] + " " + prefix}
                  </Typography>
                }
                secondary={item.county}
              />
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </Card>
  );
};

export default ReusableList;
