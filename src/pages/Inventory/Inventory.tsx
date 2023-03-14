import {
  createStyles,
  Text,
  rem,
  AspectRatio,
  Grid,
  Button,
  Container,
  Skeleton,
  useMantineTheme,
  Stack,
  SimpleGrid,
  Box,
  px,
  Card,
  Image,
  ScrollArea,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { resourceLimits } from "worker_threads";
import { logStore } from "../../store/logStore";
import { Col, Item, useStore } from "../../store/store";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },
}));

// const ItemsInCol = ( itemInCol: { item: Item }, indexInCol: { index: number }) => {
const ItemsInCol = ({
  item,
  index,
  type,
}: {
  item: Item;
  index: number;
  type: string;
}) => {
  const { classes, cx } = useStyles();
  return (
    <Draggable key={item.id} index={index} draggableId={item.specs.name} >
      {(provided: any, snapshot: any) => (
        <Image
          src={item.img}
          // caption={item.specs.name}
          bg="transparent"
          maw={140}
          mx="auto"
          radius="md"
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
        </Image>
      )}
    </Draggable>
  );
};

const Inventory = () => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const store = useStore();
  const log:any = logStore();
  const equipment:Col[] = log.user.character.equipment;

  
  useEffect(() => {
    equipment.map((col:Col, index:number) => {
      let num = store.columns.findIndex((e) => e.name === col.name);
      store.addItemsInCol(col.value, num);
    })
  }, []);

  const PushInBack = () => {
    
  };

  console.log("colonne", store.columns);
  return (
    // box che prende tutta la pagina
    <Box
      sx={{
        width: "-webkit-fill-available",
        height: "-webkit-fill-available",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <SimpleGrid cols={5} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
        <DragDropContext
          onDragEnd={(result) => {
            console.log(result);
            if (!result.destination) return;
            const sourceCol: number = store.columns.findIndex(
              (e) => e.name === result.source.droppableId
            );
            const destCol: number = store.columns.findIndex(
              (e) => e.name === result.destination?.droppableId
            );
            const item = store.columns[sourceCol].value.find(
              (e) => e.specs.name === result.draggableId
            );
            console.log("ao", store.columns[destCol].type, item?.type)
            if (!item) return;
            if (
              store.checkIfItemExists(item, store.columns[destCol].value) ===
                undefined &&
              store.columns[destCol].value.length < store.columns[destCol].limit 
            ) {
              store.addItemAndUpdateCol(item, destCol);
              store.removeItemAndUpdateCol(item, sourceCol);
            }
            console.log("colonne", store.columns);
          }}>
          {/* {store.columns.map((col, key) => {
            return (
            col.type === "inventory" && (
                <ScrollArea h={BASE_HEIGHT} w={BASE_HEIGHT / 4}>
                  <Stack sx={{ backgroundColor: "#928b8b59" }}>
                    <Text color={"white"} align={"center"}>
                      {col.name.toUpperCase()}
                    </Text>
                    <Droppable droppableId={col.name} direction="vertical">
                      {(provided: any) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {col.value.map((item, index) => (
                            <ItemsInCol
                              item={item}
                              index={index}
                              key={index}
                              type={col.type}
                            />
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Stack>
                </ScrollArea>
              ) 
              col.type != "inventory" && (
                <Stack sx={{ height: BASE_HEIGHT }} spacing="xl">
                  {store.columns.slice(key, key + 3).map((col, key) => {
                    return (
                      <div
                        key={key}
                        style={{
                          backgroundColor: "#928b8b59",
                          height: getSubHeight(3, px(theme.spacing.md)),
                        }}
                      >
                        <Text color={"white"} align={"center"}>
                          {col.name.toUpperCase()}
                        </Text>
                        <Droppable droppableId={col.name} direction="vertical">
                          {(provided: any) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                              {col.value.map((item, index) => (
                                <ItemsInCol
                                  item={item}
                                  index={index}
                                  key={index}
                                  type={col.type}
                                />
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    );
                  })}
                </Stack>
              ));
          })} */}
          {store.columns.slice(0, 1).map((col, key) => {
            return (
              <ScrollArea h={BASE_HEIGHT} w={BASE_HEIGHT / 4}>
                <Stack sx={{ backgroundColor: "#928b8b59" }}>
                  <Text color={"white"} align={"center"}>
                    {col.name.toUpperCase()}
                  </Text>
                  <Droppable droppableId={col.name} direction="vertical">
                    {(provided: any) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {col.value.map((item, index) => (
                          <ItemsInCol
                            item={item}
                            index={index}
                            key={index}
                            type={col.type}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Stack>
              </ScrollArea>
            );
          })}
          <Stack sx={{ height: BASE_HEIGHT }} spacing="xl">
            {store.columns.slice(1, 4).map((col, key) => {
              return (
                <div
                  key={key}
                  style={{
                    backgroundColor: "#928b8b59",
                    height: getSubHeight(3, px(theme.spacing.md)),
                  }}
                >
                  <Text color={"white"} align={"center"}>
                    {col.name.toUpperCase()}
                  </Text>
                  <Droppable droppableId={col.name} direction="vertical">
                    {(provided: any) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {col.value.map((item, index) => (
                          <ItemsInCol
                            item={item}
                            index={index}
                            key={index}
                            type={col.type}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </Stack>
          <Stack sx={{ height: BASE_HEIGHT }} spacing="xl">
            {store.columns.slice(4, 7).map((col, key) => {
              return (
                <div
                  key={key}
                  style={{
                    backgroundColor: "#928b8b59",
                    height: getSubHeight(3, px(theme.spacing.md)),
                  }}
                >
                  <Text color={"white"} align={"center"}>
                    {col.name.toUpperCase()}
                  </Text>
                  <Droppable droppableId={col.name} direction="vertical">
                    {(provided: any) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {col.value.map((item, index) => (
                          <ItemsInCol
                            item={item}
                            index={index}
                            key={index}
                            type={col.type}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </Stack>
          <Stack sx={{ height: BASE_HEIGHT }} spacing="xl">
            {store.columns.slice(7, 10).map((col, key) => {
              return (
                <div
                  key={key}
                  style={{
                    backgroundColor: "#928b8b59",
                    height: getSubHeight(3, px(theme.spacing.md)),
                  }}
                >
                  <Text color={"white"} align={"center"}>
                    {col.name.toUpperCase()}
                  </Text>
                  <Droppable droppableId={col.name} direction="vertical">
                    {(provided: any) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {col.value.map((item, index) => (
                          <ItemsInCol
                            item={item}
                            index={index}
                            key={index}
                            type={col.type}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </Stack>
          {store.columns.slice(10, 11).map((col, key) => {
            return (
              <ScrollArea h={BASE_HEIGHT}>
                <Stack
                  sx={{ backgroundColor: "#928b8b59", height: BASE_HEIGHT }}
                >
                  <Text color={"white"} align={"center"}>
                    {col.name.toUpperCase()}
                  </Text>
                  <Droppable droppableId={col.name} direction="vertical">
                    {(provided: any) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {col.value.map((item, index) => (
                          <ItemsInCol
                            item={item}
                            index={index}
                            key={index}
                            type={col.type}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Stack>
              </ScrollArea>
            );
            })}
          
        </DragDropContext>
      </SimpleGrid>
      <Button onClick={() => PushInBack()} >Save</Button>
    </Box>
  );
};

const BASE_HEIGHT = window.innerHeight - 150;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export default Inventory;
