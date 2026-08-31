/**
 * MemoryGame stimulus library — 18 categories x 6 images.
 *
 * Images are base64-embedded in TSX components rather than imported as files.
 * Imported image files are emitted to build/static/media/ and dropped by
 * compress_activity.sh, so they 404 in production. See CONTRIBUTING.md,
 * "Images and Static Assets".
 *
 * Element keys are the stable stimulus identifiers ("001".."108") recorded as
 * item_id / image_id in the result payload. Do not renumber them: existing
 * sessions are keyed against these values.
 */
import * as React from "react";

import Photo001 from "../photos-v2/Photo-001";
import Photo002 from "../photos-v2/Photo-002";
import Photo003 from "../photos-v2/Photo-003";
import Photo004 from "../photos-v2/Photo-004";
import Photo005 from "../photos-v2/Photo-005";
import Photo006 from "../photos-v2/Photo-006";
import Photo007 from "../photos-v2/Photo-007";
import Photo008 from "../photos-v2/Photo-008";
import Photo009 from "../photos-v2/Photo-009";
import Photo010 from "../photos-v2/Photo-010";
import Photo011 from "../photos-v2/Photo-011";
import Photo012 from "../photos-v2/Photo-012";
import Photo013 from "../photos-v2/Photo-013";
import Photo014 from "../photos-v2/Photo-014";
import Photo015 from "../photos-v2/Photo-015";
import Photo016 from "../photos-v2/Photo-016";
import Photo017 from "../photos-v2/Photo-017";
import Photo018 from "../photos-v2/Photo-018";
import Photo019 from "../photos-v2/Photo-019";
import Photo020 from "../photos-v2/Photo-020";
import Photo021 from "../photos-v2/Photo-021";
import Photo022 from "../photos-v2/Photo-022";
import Photo023 from "../photos-v2/Photo-023";
import Photo024 from "../photos-v2/Photo-024";
import Photo025 from "../photos-v2/Photo-025";
import Photo026 from "../photos-v2/Photo-026";
import Photo027 from "../photos-v2/Photo-027";
import Photo028 from "../photos-v2/Photo-028";
import Photo029 from "../photos-v2/Photo-029";
import Photo030 from "../photos-v2/Photo-030";
import Photo031 from "../photos-v2/Photo-031";
import Photo032 from "../photos-v2/Photo-032";
import Photo033 from "../photos-v2/Photo-033";
import Photo034 from "../photos-v2/Photo-034";
import Photo035 from "../photos-v2/Photo-035";
import Photo036 from "../photos-v2/Photo-036";
import Photo037 from "../photos-v2/Photo-037";
import Photo038 from "../photos-v2/Photo-038";
import Photo039 from "../photos-v2/Photo-039";
import Photo040 from "../photos-v2/Photo-040";
import Photo041 from "../photos-v2/Photo-041";
import Photo042 from "../photos-v2/Photo-042";
import Photo043 from "../photos-v2/Photo-043";
import Photo044 from "../photos-v2/Photo-044";
import Photo045 from "../photos-v2/Photo-045";
import Photo046 from "../photos-v2/Photo-046";
import Photo047 from "../photos-v2/Photo-047";
import Photo048 from "../photos-v2/Photo-048";
import Photo049 from "../photos-v2/Photo-049";
import Photo050 from "../photos-v2/Photo-050";
import Photo051 from "../photos-v2/Photo-051";
import Photo052 from "../photos-v2/Photo-052";
import Photo053 from "../photos-v2/Photo-053";
import Photo054 from "../photos-v2/Photo-054";
import Photo055 from "../photos-v2/Photo-055";
import Photo056 from "../photos-v2/Photo-056";
import Photo057 from "../photos-v2/Photo-057";
import Photo058 from "../photos-v2/Photo-058";
import Photo059 from "../photos-v2/Photo-059";
import Photo060 from "../photos-v2/Photo-060";
import Photo061 from "../photos-v2/Photo-061";
import Photo062 from "../photos-v2/Photo-062";
import Photo063 from "../photos-v2/Photo-063";
import Photo064 from "../photos-v2/Photo-064";
import Photo065 from "../photos-v2/Photo-065";
import Photo066 from "../photos-v2/Photo-066";
import Photo067 from "../photos-v2/Photo-067";
import Photo068 from "../photos-v2/Photo-068";
import Photo069 from "../photos-v2/Photo-069";
import Photo070 from "../photos-v2/Photo-070";
import Photo071 from "../photos-v2/Photo-071";
import Photo072 from "../photos-v2/Photo-072";
import Photo073 from "../photos-v2/Photo-073";
import Photo074 from "../photos-v2/Photo-074";
import Photo075 from "../photos-v2/Photo-075";
import Photo076 from "../photos-v2/Photo-076";
import Photo077 from "../photos-v2/Photo-077";
import Photo078 from "../photos-v2/Photo-078";
import Photo079 from "../photos-v2/Photo-079";
import Photo080 from "../photos-v2/Photo-080";
import Photo081 from "../photos-v2/Photo-081";
import Photo082 from "../photos-v2/Photo-082";
import Photo083 from "../photos-v2/Photo-083";
import Photo084 from "../photos-v2/Photo-084";
import Photo085 from "../photos-v2/Photo-085";
import Photo086 from "../photos-v2/Photo-086";
import Photo087 from "../photos-v2/Photo-087";
import Photo088 from "../photos-v2/Photo-088";
import Photo089 from "../photos-v2/Photo-089";
import Photo090 from "../photos-v2/Photo-090";
import Photo091 from "../photos-v2/Photo-091";
import Photo092 from "../photos-v2/Photo-092";
import Photo093 from "../photos-v2/Photo-093";
import Photo094 from "../photos-v2/Photo-094";
import Photo095 from "../photos-v2/Photo-095";
import Photo096 from "../photos-v2/Photo-096";
import Photo097 from "../photos-v2/Photo-097";
import Photo098 from "../photos-v2/Photo-098";
import Photo099 from "../photos-v2/Photo-099";
import Photo100 from "../photos-v2/Photo-100";
import Photo101 from "../photos-v2/Photo-101";
import Photo102 from "../photos-v2/Photo-102";
import Photo103 from "../photos-v2/Photo-103";
import Photo104 from "../photos-v2/Photo-104";
import Photo105 from "../photos-v2/Photo-105";
import Photo106 from "../photos-v2/Photo-106";
import Photo107 from "../photos-v2/Photo-107";
import Photo108 from "../photos-v2/Photo-108";

export const STIMULUS_SET_VERSION = "memory-game-v2-2026-08";

/** Display name per category, indexed to match memoryImageCategories. */
export const CATEGORY_NAMES: ReadonlyArray<string> = [
  "Bridges",
  "Buildings",
  "Flowers",
  "Insects",
  "Nature",
  "Tools",
  "Vegetables",
  "Vehicles",
  "Waterfalls",
  "Animals",
  "Art",
  "Chairs",
  "Garden Tools",
  "Kitchen",
  "Musical Instruments",
  "Mythical",
  "Sculptures",
  "Trees",
];

export const memoryImageCategories: ReadonlyArray<
  ReadonlyArray<React.ReactElement>
> = [
  [<Photo001 key="001" />, <Photo002 key="002" />, <Photo003 key="003" />, <Photo004 key="004" />, <Photo005 key="005" />, <Photo006 key="006" />],
  [<Photo007 key="007" />, <Photo008 key="008" />, <Photo009 key="009" />, <Photo010 key="010" />, <Photo011 key="011" />, <Photo012 key="012" />],
  [<Photo013 key="013" />, <Photo014 key="014" />, <Photo015 key="015" />, <Photo016 key="016" />, <Photo017 key="017" />, <Photo018 key="018" />],
  [<Photo019 key="019" />, <Photo020 key="020" />, <Photo021 key="021" />, <Photo022 key="022" />, <Photo023 key="023" />, <Photo024 key="024" />],
  [<Photo025 key="025" />, <Photo026 key="026" />, <Photo027 key="027" />, <Photo028 key="028" />, <Photo029 key="029" />, <Photo030 key="030" />],
  [<Photo031 key="031" />, <Photo032 key="032" />, <Photo033 key="033" />, <Photo034 key="034" />, <Photo035 key="035" />, <Photo036 key="036" />],
  [<Photo037 key="037" />, <Photo038 key="038" />, <Photo039 key="039" />, <Photo040 key="040" />, <Photo041 key="041" />, <Photo042 key="042" />],
  [<Photo043 key="043" />, <Photo044 key="044" />, <Photo045 key="045" />, <Photo046 key="046" />, <Photo047 key="047" />, <Photo048 key="048" />],
  [<Photo049 key="049" />, <Photo050 key="050" />, <Photo051 key="051" />, <Photo052 key="052" />, <Photo053 key="053" />, <Photo054 key="054" />],
  [<Photo055 key="055" />, <Photo056 key="056" />, <Photo057 key="057" />, <Photo058 key="058" />, <Photo059 key="059" />, <Photo060 key="060" />],
  [<Photo061 key="061" />, <Photo062 key="062" />, <Photo063 key="063" />, <Photo064 key="064" />, <Photo065 key="065" />, <Photo066 key="066" />],
  [<Photo067 key="067" />, <Photo068 key="068" />, <Photo069 key="069" />, <Photo070 key="070" />, <Photo071 key="071" />, <Photo072 key="072" />],
  [<Photo073 key="073" />, <Photo074 key="074" />, <Photo075 key="075" />, <Photo076 key="076" />, <Photo077 key="077" />, <Photo078 key="078" />],
  [<Photo079 key="079" />, <Photo080 key="080" />, <Photo081 key="081" />, <Photo082 key="082" />, <Photo083 key="083" />, <Photo084 key="084" />],
  [<Photo085 key="085" />, <Photo086 key="086" />, <Photo087 key="087" />, <Photo088 key="088" />, <Photo089 key="089" />, <Photo090 key="090" />],
  [<Photo091 key="091" />, <Photo092 key="092" />, <Photo093 key="093" />, <Photo094 key="094" />, <Photo095 key="095" />, <Photo096 key="096" />],
  [<Photo097 key="097" />, <Photo098 key="098" />, <Photo099 key="099" />, <Photo100 key="100" />, <Photo101 key="101" />, <Photo102 key="102" />],
  [<Photo103 key="103" />, <Photo104 key="104" />, <Photo105 key="105" />, <Photo106 key="106" />, <Photo107 key="107" />, <Photo108 key="108" />],
];
