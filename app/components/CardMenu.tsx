// app/components/CardMenu.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Box
} from "@mui/material";

interface MenuItem {
  href: string;
  title: string;
  icon: React.ReactElement;
}

interface CardMenuProps {
  menuItems: MenuItem[];
}

const CardMenu: React.FC<CardMenuProps> = ({ menuItems }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={6} key={item.href}>
            <Card>
              <CardActionArea component={Link} href={item.href}>
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: 4
                  }}
                >
                  {item.icon}
                  <Typography variant="h6" component="div" sx={{ mt: 2, textAlign: 'center' }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardMenu;
