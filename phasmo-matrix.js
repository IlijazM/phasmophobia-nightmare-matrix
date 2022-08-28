/**
 * @typedef {"Freezing Temperatures" | "Ghost Orb" | "Spirit Box" | "DOTS Projector" | "EMF Level 5" | "Fingerprints" | "Ghost Writing"} Evidence
 */

/**
 * @typedef Ghost
 * @property {string} name
 * @property {Evidence[]} evidences
 * @property {Evidence} [forcedEvidence]
 * @property {string} [proAbility]
 * @property {string} [contraAbility]
 */

/** @type {Ghost[]} */
const ghosts = [
  {
    name: "Banshee",
    evidences: ["Fingerprints", "Ghost Orb", "DOTS Projector"],
    proAbility: ["Normal speed"],
  },
  {
    name: "Demon",
    evidences: ["Fingerprints", "Ghost Writing", "Freezing Temperatures"],
    proAbility: ["Early hunt", "Normal speed"],
  },
  {
    name: "Deogen",
    evidences: ["Spirit Box", "Ghost Writing", "DOTS Projector"],
    proAbility: ["Unusual speed"],
  },
  {
    name: "Goryo",
    evidences: ["EMF Level 5", "Fingerprints", "DOTS Projector"],
    forcedEvidence: "DOTS Projector",
    proAbility: ["Normal speed"],
  },
  {
    name: "Hantu",
    evidences: ["Fingerprints", "Ghost Orb", "Freezing Temperatures"],
    forcedEvidence: "Freezing Temperatures",
    contraAbility: ["Turn on Fuze Box"],
    proAbility: ["Unusual speed"],
  },
  {
    name: "Jinn",
    evidences: ["EMF Level 5", "Fingerprints", "Freezing Temperatures"],
    contraAbility: ["Turn off Fuze Box"],
    proAbility: ["Unusual speed"],
  },
  {
    name: "Mare",
    evidences: ["Spirit Box", "Ghost Orb", "Ghost Writing"],
    contraAbility: ["Turn on lights"],
    proAbility: ["Early hunt", "Normal speed"],
  },
  {
    name: "Moroi",
    evidences: ["Spirit Box", "Ghost Writing", "Freezing Temperatures"],
    forcedEvidence: "Spirit Box",
    proAbility: ["Unusual speed"],
  },
  {
    name: "Myling",
    evidences: ["EMF Level 5", "Fingerprints", "Ghost Writing"],
    proAbility: ["Normal speed"],
  },
  {
    name: "Obake",
    evidences: ["EMF Level 5", "Fingerprints", "Ghost Orb"],
    forcedEvidence: "Fingerprints",
    proAbility: ["Normal speed"],
  },
  {
    name: "Oni",
    evidences: ["EMF Level 5", "Freezing Temperatures", "DOTS Projector"],
    contraAbility: ["Ghost Ball Event"],
    proAbility: ["Normal speed"],
  },
  {
    name: "Onryo",
    evidences: ["Spirit Box", "Ghost Orb", "Freezing Temperatures"],
    proAbility: ["Early hunt", "Normal speed"],
  },
  {
    name: "Phantom",
    evidences: ["Spirit Box", "Fingerprints", "DOTS Projector"],
    proAbility: ["Normal speed"],
  },
  {
    name: "Poltergeist",
    evidences: ["Spirit Box", "Fingerprints", "Ghost Writing"],
    proAbility: ["Normal speed"],
  },
  {
    name: "Raiju",
    evidences: ["EMF Level 5", "Ghost Orb", "DOTS Projector"],
    proAbility: ["Early hunt"],
    proAbility: ["Unusual speed"],
  },
  {
    name: "Revenant",
    evidences: ["Ghost Orb", "Ghost Writing", "Freezing Temperatures"],
    proAbility: ["Unusual speed"],
  },
  {
    name: "Shade",
    evidences: ["EMF Level 5", "Ghost Writing", "Freezing Temperatures"],
    proAbility: ["Normal speed"],
  },
  {
    name: "Spirit",
    evidences: ["EMF Level 5", "Spirit Box", "Ghost Writing"],
    proAbility: ["Normal speed"],
  },
  {
    name: "Thaye",
    evidences: ["Ghost Orb", "Ghost Writing", "DOTS Projector"],
    proAbility: ["Early hunt"],
    proAbility: ["Unusual speed"],
  },
  {
    name: "The Mimic",
    evidences: ["Spirit Box", "Fingerprints", "Freezing Temperatures", "Ghost Orb"],
    forcedEvidence: "Ghost Orb",
    proAbility: ["Normal speed"],
  },
  {
    name: "The Twins",
    evidences: ["EMF Level 5", "Spirit Box", "Freezing Temperatures"],
    proAbility: ["Unusual speed"],
  },
  {
    name: "Wraith",
    evidences: ["EMF Level 5", "Spirit Box", "DOTS Projector"],
    proAbility: ["Normal speed"],
  },
  {
    name: "Yokai",
    evidences: ["Spirit Box", "Ghost Orb", "DOTS Projector"],
    proAbility: ["Early hunt", "Normal speed"],
  },
  {
    name: "Yurei",
    evidences: ["Ghost Orb", "Freezing Temperatures", "DOTS Projector"],
    proAbility: ["Normal speed"],
  },
];

const contraAbilities = ["Turn off Fuze Box", "Turn on Fuze Box", "Ghost Ball Event", "Turn on lights"];
const proAbilities = ["Early hunt", "Normal speed", "Unusual speed"];

/** @type {Evidence[]} */
const evidences = [
  "Freezing Temperatures",
  "Ghost Orb",
  "Spirit Box",
  "DOTS Projector",
  "EMF Level 5",
  "Fingerprints",
  "Ghost Writing",
];

class PhasmoMatrix {
  constructor() {
    this.evidences = evidences.map((evidence) => ({
      evidence,
      selected: "",
    }));

    this.abilities = [
      ...contraAbilities.map((ability) => ({
        ability,
        type: "contra",
        selected: "",
      })),
      ...proAbilities.map((ability) => ({
        ability,
        type: "pro",
        selected: "",
      })),
    ];
  }

  init() {
    const ghostsEl = document.querySelector("#ghosts");
    ghostsEl.innerHTML = ghosts.map((ghost) => buildGhostEl(ghost, this.evidences, this.abilities)).join("");

    const evidenceEl = document.querySelector("#evidences");
    evidenceEl.innerHTML = this.evidences.map(buildEvidenceEl).join("");

    const abilityEl = document.querySelector("#abilities");
    abilityEl.innerHTML = this.abilities.map(buildAbilityEl).join("");

    const ghostNumberEl = document.querySelector("#ghost-number");
    ghostNumberEl.innerHTML = `${document.querySelector("#ghosts").childElementCount} / ${ghosts.length}`;
  }

  selectEvidence(evidenceName, select = "selected") {
    const evidence = this.evidences.filter((el) => el.evidence === evidenceName)[0];
    if (evidence.selected === "") {
      evidence.selected = select;
    } else {
      evidence.selected = "";
    }
    this.init();
  }

  deselectEvidence(evidenceName) {
    this.selectEvidence(evidenceName, "deselected");
  }

  selectAbility(abilityName) {
    const ability = this.abilities.filter((el) => el.ability === abilityName)[0];
    if (ability.selected === "") {
      ability.selected = "selected";
    } else {
      ability.selected = "";
    }
    this.init();
  }
}

/**
 * @param {Ghost} ghost
 */
function buildGhostEl(ghost, evidences, abilities) {
  let hidden = false;

  evidences
    .filter((evidence) => evidence.selected === "selected")
    .forEach((selectedEvidence) => {
      if (!ghost.evidences.includes(selectedEvidence.evidence)) {
        hidden = true;
      }
    });

  let notHiddenEvidences = [...ghost.evidences];

  evidences
    .filter((evidence) => evidence.selected === "deselected")
    .forEach((deselectedEvidences) => {
      notHiddenEvidences = notHiddenEvidences.filter((ev) => ev !== deselectedEvidences.evidence);
      if (ghost.forcedEvidence === deselectedEvidences.evidence) {
        hidden = true;
      }
    });

  if (notHiddenEvidences.length < 2) {
    return "";
  }

  abilities
    .filter((evidence) => evidence.selected === "selected")
    .filter((ability) => ability.type === "contra")
    .forEach((ability) => {
      if (ghost.contraAbility?.includes(ability.ability)) {
        hidden = true;
      }
    });

  abilities
    .filter((evidence) => evidence.selected === "selected")
    .filter((ability) => ability.type === "pro")
    .forEach((ability) => {
      if (!ghost.proAbility?.includes(ability.ability)) {
        hidden = true;
      }
    });

  if (hidden) {
    return "";
  }

  return `<div class="ghost card m-2 p-2">
    <div class="name">${ghost.name}</div>
    <div class="evidences">
      ${ghost.evidences.map((evidence) => `<span class="badge badge-info m-1">${evidence}</span>`).join("")}
    </div>
  </div>`;
}

function buildEvidenceEl(evidence) {
  const cssClass =
    evidence.selected === "selected" ? "border-success" : evidence.selected === "deselected" ? "border-danger" : "";
  return `<div class="evidence card ${cssClass} m-2">
    <div class="flex pl-4 pr-4" style="align-items: center">
      <span>${evidence.evidence}</span>
      <div style="flex: 1"></div>
      <button class="btn btn-ghost" onclick="phasmoMatrix.selectEvidence('${evidence.evidence}')">
        <i class="bi bi-plus-lg"></i>
      </button>
      <button class="btn btn-ghost" onclick="phasmoMatrix.deselectEvidence('${evidence.evidence}')">
        <i class="bi bi-dash-lg"></i>
      </button>
    </div>
  </div>`;
}

function buildAbilityEl(ability) {
  const cssClass = ability.selected === "selected" ? "border-success" : ability.selected === "deselected" ? "border-danger" : "";
  return `<div class="ability card ${cssClass} m-2">
    <div class="flex pl-4 pr-4" style="align-items: center">
      <span>${ability.ability}</span>
      <div style="flex: 1"></div>
      <button class="btn btn-ghost" onclick="phasmoMatrix.selectAbility('${ability.ability}')">
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
  </div>`;
}

const phasmoMatrix = new PhasmoMatrix();
phasmoMatrix.init();
