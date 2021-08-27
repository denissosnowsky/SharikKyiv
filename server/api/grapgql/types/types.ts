import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";
import { ApolloServerContext } from "../../types/ApolloServerContext";

export const BouquetType: GraphQLObjectType = new GraphQLObjectType({
  name: "Bouquet",
  fields: () => ({
    id: { type: GraphQLID },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
    name: { type: GraphQLString },
    subname: { type: GraphQLString },
    price: { type: GraphQLString },
    description: { type: GraphQLString },
    code: { type: GraphQLInt },
    image: { type: GraphQLString },
    personType: { type: PersonType },
  }),
});

export const PersonType: GraphQLEnumType = new GraphQLEnumType({
  name: "Person",
  values: {
    MAN: { value: "MAN" },
    WOMAN: { value: "WOMAN" },
    CHILD: { value: "CHILD" },
  },
});

export const BalloonType: GraphQLObjectType = new GraphQLObjectType({
  name: "Balloon",
  fields: () => ({
    id: { type: GraphQLID },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
    name: { type: GraphQLString },
    subname: { type: GraphQLString },
    price: { type: GraphQLString },
    description: { type: GraphQLString },
    code: { type: GraphQLInt },
    image: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.category.findUnique({where: {id: parent.categoryId}});
      },
    },
    color: {
      type: ColorType,
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.color.findUnique({where: {id: parent.colorId}});
      },
    },
  }),
});

export const CategoryType: GraphQLObjectType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    balloons: {
      type: GraphQLList(BalloonType),
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.balloon.findMany({where: {categoryId: parent.id}});
      },
    },
  }),
});

export const ColorType: GraphQLObjectType = new GraphQLObjectType({
  name: "Color",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    cssName: { type: GraphQLString },
    balloons: {
      type: GraphQLList(BalloonType),
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.balloon.findMany({where: {colorId: parent.id}});
      },
    },
  }),
});

export const AssortmentType: GraphQLObjectType = new GraphQLObjectType({
  name: "Assortment",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    fixed: { type: GraphQLBoolean },
  }),
});

export const PhoneType: GraphQLObjectType = new GraphQLObjectType({
  name: "Phone",
  fields: () => ({
    id: { type: GraphQLID },
    number: { type: GraphQLString },
  }),
});

export const SocialNetType: GraphQLObjectType = new GraphQLObjectType({
  name: "SocialNet",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    link: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

export const DeliveryPriceType: GraphQLObjectType = new GraphQLObjectType({
    name: "DeliveryPrice",
    fields: () => ({
        id: { type: GraphQLID },
        price: { type: GraphQLString }
    }),
});
