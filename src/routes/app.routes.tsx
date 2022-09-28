import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";

import { Dashbord } from "../screens/Dashbord";
import { Register } from "../screens/Register";


const { Navigator, Screen } = createBottomTabNavigator();


export function AppRoutes() {

    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 80,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >
            <Screen
                name="Listagem"
                component={Dashbord}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons
                            name="format-list-bulleted"
                            color={color}
                            size={size}
                        />
                    }
                }}
            />
            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons
                            name="attach-money"
                            color={color}
                            size={size}
                        />
                    }
                }}
            />
            <Screen
                name="Resumo"
                component={Register}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons
                            name="pie-chart"
                            color={color}
                            size={size}
                        />
                    }
                }}
            />
        </Navigator>
    )
}