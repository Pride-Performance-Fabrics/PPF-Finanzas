import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFireFlameSimple } from "@fortawesome/free-solid-svg-icons";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faFrCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle as faFsCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import {faFileLines} from "@fortawesome/free-regular-svg-icons";
import IconApp from './IconApp';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

// TODO AGREGAR ICONOS DE REMIX ICON
const Icon = ({icon}) => {
    library.add(faFireFlameSimple);
    library.add(faUpRightFromSquare);
    library.add(faBorderNone);
    library.add(faGrip);
    library.add(faGears);
    library.add(faGear);
    library.add(faFrCircle);
    library.add(faFsCircle);
    library.add(faPlus);
    library.add(faCalendarDays);
    library.add(faClock);
    library.add(faClockRotateLeft);
    library.add(faCalendarDay);
    library.add(faDroplet);
    library.add(faTruck);
    library.add(faUserClock);
    library.add(faFileLines);
  return (
    <span className='icon'>
        {icon.includes('pi-') ? <span className={`icon p-menuitem-icon pi ${icon}`} ></span> :( icon.includes('ri-') ? <span className={`icon ${icon}`} ></span> :  <FontAwesomeIcon className='p-menuitem-icon' icon={icon} /> ) }
      
    </span>
  )
}

export default Icon