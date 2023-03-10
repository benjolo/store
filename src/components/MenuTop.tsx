import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GiAbdominalArmor } from "react-icons/gi";
import { Link } from "react-router-dom";
import { logStore } from "../store/logStore";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const MenuTop = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const log = logStore((state: any) => state.log);

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Link to={"/"}>
          <GiAbdominalArmor size={60} />
          </Link>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link to="/" className={classes.link}>Home</Link>
            <Link to="/profile" className={classes.link}>
              Profile
            </Link>
            <Link to="/inventory" className={classes.link}>
              Inventory
            </Link>
          </Group>

          {log === false ? (
            <Group className={classes.hiddenMobile}>
              <Link to="/login">
                <Button variant="default">Log in</Button>
              </Link>
              <Link to="/login">
                <Button>Sign up</Button>
              </Link>
            </Group>
          ) : (
            <Group className={classes.hiddenMobile}>
              <Button
                variant="default"
                onClick={() => logStore.setState({ log: false })}
              >
                Log out
              </Button>
              <Button variant="default">Settings</Button>
            </Group>
          )}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link to={"/"} className={classes.link} onClick={closeDrawer}>Home</Link>
          <Link to="/profile" className={classes.link} onClick={closeDrawer}>
            Profile
          </Link>
          <Link to="/inventory" className={classes.link} onClick={closeDrawer}>
            Inventory
          </Link>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {log === false ?
            <Group position="center" grow pb="xl" px="md">
            <Link to="/login" onClick={closeDrawer}>
              <Button variant="default">Log in</Button>
            </Link>
            <Link to="/login" onClick={closeDrawer}>
              <Button>Sign up</Button>
            </Link>
          </Group>
          :
          <Group position="center" grow pb="xl" px="md">
            <Button
              variant="default"
              onClick={() => {logStore.setState({ log: false }); closeDrawer()}}
            >
              Log out
            </Button>
            <Button variant="default" onClick={closeDrawer}>Settings</Button>
          </Group>
          }
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default MenuTop;
