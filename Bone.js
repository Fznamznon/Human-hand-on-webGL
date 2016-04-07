var Bones = [];

function Bone(filename, Joint, Visible, parent, childs) {
    this.filename = filename;
    this.VertexPositionBuffer = null;
    this.VertexIndicesBuffer = null;
    this.Joint = Joint;
    this.Visible = Visible;
    this.Childs = childs;
    Bones.push(this);
    if (parent != null)
        parent.Childs.push(this);
}

function Joint(location, orientation, movable) {

    this.location = location;
    this.orientation = orientation;
    this.movable = movable;
    this.Motions = [];
    this.addMotion = function (motion) {
        this.Motions.push(motion);
    }
}

function Motion(axis, min, max, cur_value) {
    this.axis = axis;
    this.min = min;
    this.max = max;
    this.cur_value = cur_value;
}




var humerus = new Bone("bones/humerus.asc", null, true, null, [] );

var elbow_flexion = new Motion([0.226046935824, 0.191039945763, 0.955199728815],
    0.0,
    2.268928027593,
    0.0
);


var elbow = new Joint(
    [0.0127, -0.274, 0.0389],
    [0, 0, 0],
    true
);

elbow.addMotion(elbow_flexion);

var ulna = new Bone("bones/_ulna.asc", elbow, true, humerus, [] );

var pro_sup = new Motion(
    [0.056398022307, 0.983577389037, -0.171449067814],
    -1.570796326795,
    1.570796326795,
    0.0
);


var radioulnar = new Joint(

    [-0.0065, -0.008, 0.027],
    [0, 0, 0],
    true
);

radioulnar.addMotion(pro_sup);

var radius = new Bone("bones/_radius.asc", radioulnar, true, ulna, []);

var rad_rotaxis = new Joint(
    [-0.0085, -0.2313, 0.0561],
    [-0.261799387799, 0.392699081699, 0.0],
    false

);

var rotaxis = new Bone(null, rad_rotaxis, false, radius, []);

var flexion = new Motion(
    [0, 0, 1],
    -1.221730476396,
    1.221730476396,
    0.0
);

var rotaxis_auxprfem = new Joint(
    [-0.001, 0.009, 0.0],
    [0, 0, 0],
    true
);

rotaxis_auxprfem.addMotion(flexion);

var auxprfem = new Bone(null, rotaxis_auxprfem, false, rotaxis, []);

var deviation = new Motion(
    [1, 0, 0],
    -0.436332312999,
    0.610865238198,
    0.0
);

var auxprfem_auxprrud = new Joint(
    [0, 0, 0],
    [0, 0, 0],
    true
);
auxprfem_auxprrud.addMotion(deviation);


var auxprrud = new Bone(null, auxprfem_auxprrud, false, auxprfem, []);

var auxprrud_auxdrfem = new Joint(
    [0.001, -0.02, 0.0],
    [0, 0, 0],
    false
);

var auxdrfem = new Bone(null, auxprrud_auxdrfem, false, auxprrud, []);

var auxdrfem_auxdrrud = new Joint(
    [0, 0, 0],
    [0, 0, 0],
    false
);


var auxdrrud = new Bone(null, auxdrfem_auxdrrud, false, auxdrfem, []);

var prox_scaph = new Joint(
    [-0.0035, -0.0025, 0.009],
    [0.401425727959, 0.0, 0.0],
    false
);

var scaphoid = new Bone("bones/_r_scaph.asc", prox_scaph, true, auxprrud, []);

var prox_lun = new Joint(
    [-0.004, -0.0015, -0.007],
    [0, 0, 0],
    false
);

var lunate = new Bone("bones/_r_lun.asc", prox_lun, true, auxprrud, []);

var dist_trpzm = new Joint(
    [0.0035, -0.0035, 0.02],
    [-0.261799387799, 0.0, 0.0],
    false
);

var trapezium = new Bone("bones/_r_trpzm.asc", dist_trpzm, true, auxdrrud, []);

var dist_trpzd = new Joint(
    [-0.0015, -0.0044, 0.0134],
    [0.349065850399, -0.174532925199, 0.0],
    false
);

var trapezoid = new Bone("bones/_r_trpzd.asc", dist_trpzd, true, auxdrrud, []);

var dist_cap = new Joint(
    [-0.0155, -0.0018, -0.0055],
    [0.174532925199, 0.0, 0.0],
    false
);

var capitate = new Bone("bones/_r_cap.asc", dist_cap, true, auxdrrud, []);

var prox_pis = new Joint(
    [0.005, -0.015, -0.0201],
    [0, 0, 0],
    false
);

var pisiform = new Bone("bones/_r_pis.asc", prox_pis, true, auxprrud, []);

var prox_triq = new Joint(
    [-0.0055, -0.01, -0.021],
    [0, 0, 0],
    false
);

var triquetrum = new Bone("bones/_r_triq.asc",  prox_pis, true, auxprrud, []);

var dist_ham = new Joint(
    [-0.006, -0.005, -0.0175],
    [-0.209439510239, 0.0, 0.0],
    false
);

var hamate = new Bone("bones/_r_ham.asc", dist_ham, true, auxdrrud, []);

var auxCMC = new Joint(
    [0, 0, 0],
    [0, 0, 0],
    false
);

var carp_metacarp = new Bone(null, auxCMC, false, auxdrrud, []);

var CMC2 = new Joint(
    [-0.0047, -0.0095, -0.005],
    [0.174532925199, 0.261799387799, 0.0],
    false
);

var metacarpal2 = new Bone("bones/_fingers1.asc", CMC2, true,  carp_metacarp, []);

var MCP2_lateral = new Motion(
    [1, 0, 0],
    -0.349065850399,
    0.349065850399,
    0
);

var MCP2_flex = new Motion(
    [0, 0, 1],
    -0.174532925199,
    1.570796326795,
    0
)

var MCP2 = new Joint(
    [-0.0024, -0.0685, 0.045],
    [0 ,0, 0],
    true
);

MCP2.addMotion(MCP2_lateral);
MCP2.addMotion(MCP2_flex);

var Iphalanx1 = new Bone("bones/_fingers2.asc", MCP2, true, metacarpal2, []);

var PIP_flex = new Motion(
    [0, 0, 1],
    -0.0872664626,
    1.570796326795,
    0
);

var PIP = new Joint(
    [0.0005, -0.04826, 0.00799],
    [0, 0, 0],
    true
);

PIP.addMotion(PIP_flex);

var Iphalanx2 = new Bone("bones/_fingers3.asc", PIP, true, Iphalanx1, []);

var DIP_flex = new Motion(
    [0, 0, 1],
    -0.0872664626,
    1.570796326795,
    0
);

var DIP = new Joint(
    [0.00193, -0.03277, 0.00472],
    [0, 0, 0],
    true
);
DIP.addMotion(DIP_flex);

var Iphalanx3 = new Bone("bones/_fingers4.asc", DIP, true, Iphalanx2, []);

function initSlider(bone, num, numOM) {
    var div = document.createElement('div');
    div.id = "Motion_of_Bone"+num.toString()+"_num" + numOM.toString();

    document.body.appendChild(div);

    $("#" + div.id).slider({
        min: bone.Joint.Motions[numOM].min,
        max: bone.Joint.Motions[numOM].max,
        step: 0.001,
        slide: function( event, ui ) {
            bone.Joint.Motions[numOM].cur_value = ui.value;
        }
    }).slider("float");

}