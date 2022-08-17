import { useState } from 'react';
import Router from "next/router";
import FormTitle from "../components/Form/FormTitle";

import {Stack, Image, Flex, Avatar, Box, Text, Spacer, Button, Textarea, Center, Input, Container, VStack} from "@chakra-ui/react";
import { postData } from '../services/HttpService';
import {getData_Local, storeData_Local} from '../services/StorageService';

const Settings = () => {

    

    return (

        <div className="page_style">
            <FormTitle title="Settings" />        
        </div>

    );
}

export default Settings;