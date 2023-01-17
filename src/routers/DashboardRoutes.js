import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { decodeToken } from "react-jwt";