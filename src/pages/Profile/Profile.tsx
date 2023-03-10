import { logStore } from "../../store/logStore";
import { User } from "../../store/logStore";


import { createStyles, Card, Image, Text, Group, RingProgress, rem, AspectRatio, List, ThemeIcon, Flex } from '@mantine/core';
import { GiCenturionHelmet, GiShoulderArmor, GiStrongMan, GiSwordWound, GiVikingShield,  } from "react-icons/gi";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

const Profile = () => {
  const { classes } = useStyles();
  const user = logStore((state: any) => state.user);
  const items = (
    <List mx="auto">
      <List.Item icon={<ThemeIcon radius="sm" size="m" color="black"><GiCenturionHelmet /></ThemeIcon>}>
        <Text>{user.character.class}</Text>
      </List.Item>
      <List.Item icon={<ThemeIcon radius="sm" size="m" color="black"><GiStrongMan /></ThemeIcon>}>
        <Text>{user.character.level}</Text>
      </List.Item>
      <List.Item icon={<ThemeIcon radius="sm" size="m" color="black"><GiSwordWound /></ThemeIcon>}>
        <Text>{user.character.equipment.spada}</Text>
      </List.Item>
      <List.Item icon={<ThemeIcon radius="sm" size="m" color="black"><GiVikingShield /></ThemeIcon>}>
        <Text>{user.character.equipment.scudo}</Text>
      </List.Item>
      <List.Item icon={<ThemeIcon radius="sm" size="m" color="black"><GiShoulderArmor /></ThemeIcon>}>
        <Text>{user.character.equipment.armatura}</Text>
      </List.Item>
    </List>
  );

  return (
    <Flex
      direction={{ base: 'row', sm: 'row' }}
      gap={{ base: 'sm', sm: 'lg' }}
      justify={{ sm: 'center' }}
    >
    <Card withBorder>
      <Card.Section>
        <AspectRatio ratio={720 / 1080} maw={300} mx="auto">
          <Image src={user.userInfo.avatar_url} alt={"ProfilePicture"} />
        </AspectRatio>
      </Card.Section>
      <Group position="apart" mt="xl" >
        <List>
          <Text fz="sm" fw={700} className={classes.title}>
            {user.userInfo.nome_completo}
          </Text>
          <Text fz="xs" c="dimmed">
            Exp: {user.character.exp}
          </Text>
          <Text mt="sm" mb="md" c="dimmed" fz="xs">
            Username: {user.username}
          </Text>
        </List>
        <Card.Section className={classes.footer}>{items}</Card.Section>
      </Group>
    </Card>
    </Flex>
  );
}

export default Profile;