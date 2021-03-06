
  function SingleAmb(thisAmb){
    var thisAmbID = thisAmb;
    $.get("http://opends.azurewebsites.net/api/dynamic/ambulanceCancel.php?ambID=" + thisAmb,function( result ){
      if(result == "1"){
        ambMarkers[thisAmbID].setMap(null);
      }else if(result == "2"){

      }
    });
  }

  function InjuredCancel(thisInj){
    var thisInjID = thisInj;
    $.get("http://opends.azurewebsites.net/api/dynamic/injuredCancel.php?injID=" + thisInjID,function( result ){
      if(result == "OK"){
        injMarkers[thisInjID].setMap(null);
        injMarkers[thisInjID]=null;
        injContent[thisInjID]=null;
      }
    });
  }

  function SuppliesCancel(thisSup){
    var thisSupID = thisSup;
    $.get("http://opends.azurewebsites.net/api/dynamic/suppliesCancel.php?SupID=" + thisSupID,function( result ){
      if(result == "OK"){
        supMarkers[thisSupID].setMap(null);
        supMarkers[thisSupID]=null;
        supContent[thisSupID]=null;
      }
    });
  }

  function DisasterCancel(thisDis){
    var thisDisID = thisDis;
    $.get("http://opends.azurewebsites.net/api/dynamic/disasterCancel.php?DisID=" + thisDisID,function( result ){
      if(result == "OK"){
        disMarkers[thisDisID].setMap(null);
        disMarkers[thisDisID]=null;
        disContent[thisDisID]=null;
      }
    });
  }


  function AlertStatus( thisType, thisInfo){
      var lertInfoMsg='<div class="alert alert-dismissable alert-success">'+
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
        '<strong>載入'+thisType+'</strong>'+ thisInfo
      '</div></div>';
      $("#alertStatus").html($("#alertStatus").html()+lertInfoMsg);
  }




/******************  Marker ******************/


  function hospitalMarkers(map) {
    $.get("http://opends.azurewebsites.net/api/static/hospital.php", function (data) {
        var HosJSON = JSON.parse(data);
        $.each(HosJSON, function (i, val) {
            var marker = new google.maps.Marker({
                'position': new google.maps.LatLng(val.lat, val.lng),
                'icon': hospitalImg,
                'title': val.name + "," + val.ID
            });
            hosMarkers.push(marker);
            hosContent[val.ID]= '';
        });
        hospitalStatus();
      $("#HosNum").html("#"+hosMarkers.length);
    });
  }
  function policeMarkers(map) {
    $.get("http://opends.azurewebsites.net/api/static/police.php", function (data) {
        var HosJSON = JSON.parse(data);
        $.each(HosJSON, function (i, val) {
            var marker = new google.maps.Marker({
                'position': new google.maps.LatLng(val.lat, val.lng),
                'icon': policeImg,
                'title': val.name + "," + val.ID
            });
            polMarkers.push(marker);
            polContent[val.ID]= polInfo(val);
        });
      $("#PolNum").html("#"+polMarkers.length);
    });
  }
  
  function shelterMarkers(map) {
    $.get("http://opends.azurewebsites.net/api/static/shelter.php", function (data) {
        var SheJSON = JSON.parse(data);
        $.each(SheJSON, function (i, val) {
            var marker = new google.maps.Marker({
                'position': new google.maps.LatLng(val.lat, val.lng),
                'icon': shelterImg,
                'title': val.name + "," + val.ID
            });
            sheMarkers.push(marker);
            sheContent[val.ID]= sheInfo(val);
        });
      $("#SheNum").html("#"+sheMarkers.length);
    });
  }
  function ambulancebMarkers(map) {
    $.get("http://opends.azurewebsites.net/api/dynamic/ambulanceSync.php?Days=5", function (data) {
        var AmbJSON = JSON.parse(data);
        $.each(AmbJSON, function (i, val) {
            if(typeof(ambMarkers[val.AmbID]) == 'undefined' || ambMarkers[val.AmbID] == null){
              var marker = new google.maps.Marker({
                  'position': new google.maps.LatLng(val.lat, val.lng),
                  'icon': ambulanceImg,
                  'title': val.AmbID+","+val.IP
              });
              if(SyncElems['ambulance']){
                alert(val.AmbID);
                marker.setMap(map);
              }
              ambMarkers[val.AmbID] = marker;
              ambContent[val.AmbID] = "";
            }else{
              ambMarkers[val.AmbID].setPosition(new google.maps.LatLng(val.lat, val.lng));
            }
        });
      $("#AmbNum").html("#"+Object.keys(ambMarkers).length);
      ambulanceStatus();
    });
  }
  function injuredMarkers(map) {
    $.get("http://opends.azurewebsites.net/api/dynamic/injured.php", function (data) {
        var InjJSON = JSON.parse(data);
        $.each(InjJSON, function (i, val) {
            var marker = new google.maps.Marker({
                'position': new google.maps.LatLng(val.lat, val.lng),
                'icon': injuredImg,
                'title':  val.InjID + "," +val.IName
            });
            if(SyncElems['injured']){
              marker.setMap(map);
            }
            injMarkers[val.InjID] = marker;
            injContent[val.InjID] = "-";
        });
      injuredStatus();
      $("#InjNum").html("#"+Object.keys(injMarkers).length);
    });
  }
  function personMarkers(map) {
    $.get("http://opends.azurewebsites.net/api/dynamic/person.php?Days=20", function (data) {
        var PerJSON = JSON.parse(data);
        $.each(PerJSON, function (i, val) {
            if(typeof(perMarkers[val.UserID]) == 'undefined' || perMarkers[val.UserID] == null){
              var marker = new google.maps.Marker({
                  'position': new google.maps.LatLng(val.lat, val.lng),
                  'icon': personImg,
                  'title': val.UserID +" Time: "+ val.time
              });
              if(SyncElems['person']){
                marker.setMap(map);
              }
              perMarkers[val.UserID] = marker;
              perContent[val.UserID] = "";
            }else{
              perMarkers[val.UserID].setPosition(new google.maps.LatLng(val.lat, val.lng));
            }
        });
      $("#PerNum").html("#"+Object.keys(perMarkers).length);
      $("#UpTime_person").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
    });
  }
  function disasterMarkers(map) {
    $.get("http://opends.azurewebsites.net/api/dynamic/disaster.php", function (data) {
        var DisJSON = JSON.parse(data);
        $.each(DisJSON, function (i, val) {
            var marker = new google.maps.Marker({
                'position': new google.maps.LatLng(val.lat, val.lng),
                'icon': disasterImg,
                'title': val.DisID
            });
            disMarkers[val.DisID] = marker;
            disContent[val.DisID] = disInfo(val);
        });
        disasterStatus();
      $("#DisNum").html("#"+Object.keys(disMarkers).length);
    });
  }
  function suppliesMarkers(map) {
    $.get("http://opends.azurewebsites.net/api/dynamic/supplies.php", function (data) {
        var SupJSON = JSON.parse(data);
        $.each(SupJSON, function (i, val) {
            var marker = new google.maps.Marker({
                'position': new google.maps.LatLng(val.lat, val.lng),
                'icon': suppliesImg,
                'title': val.SupID
            });
            supMarkers[val.SupID] = marker;
            supContent[val.SupID] = supInfo(val);
        });
        suppliesStatus();
        $("#SupNum").html("#"+Object.keys(supMarkers).length);
    });
  }


/******************  Status ******************/


    function hospitalStatus(){
      for (var HID in hosContent){
        $.get("http://opends.azurewebsites.net/api/dynamic/hospitalInfo.php?HID=" + HID, function (result) {
            var HosObj = JSON.parse(result);
            hosContent[HosObj.HID] = hosInfo(HosObj);
        });          
      }
      $("#UpTime_hospital").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
    }

    function ambulanceStatus(){
      for (var AID in ambContent){
        // alert(AID);
        $.get("http://opends.azurewebsites.net/api/dynamic/ambulanceInfo.php?AmbID=" + AID, function (AmbInfo) {
            var AmbObj = JSON.parse(AmbInfo);
            // alert(AmbObj.ambID);
            ambContent[AmbObj.ambID] = ambInfo(AmbObj);
        });          
      }
      $("#UpTime_ambulance").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
    }


    function injuredStatus(){
        var Group="";
        for (var IID in injContent){
            Group = Group+","+IID;
        }
        $.get("http://opends.azurewebsites.net/api/dynamic/InjuredStatus.php?InjGroupID=" + Group, function (InjInfo) {
            var InjObj = JSON.parse(InjInfo);
            for(var key in InjObj.New){
                var ThisObj = InjObj.New[key];
                if(typeof(ThisObj.InjID) == 'undefined' || injMarkers[ThisObj] == null){
                  injMarkers[ThisObj.InjID]= new google.maps.Marker({
                    'position': new google.maps.LatLng(ThisObj.lat, ThisObj.lng),
                    'icon': injuredImg,
                    'title': ThisObj.InjID + "," + ThisObj.IName
                  });
                  if(MapElems['injured']){
                    injMarkers[ThisObj.InjID].setMap(map);
                  }

                }
                injContent[ThisObj.InjID] = injInfo(ThisObj);
            }
            $("#UpTime_injured").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
        });
    }

    function disasterStatus(){
        var Group="";
        for (var DID in disContent){
            Group = Group+","+DID;
        }
        $.get("http://opends.azurewebsites.net/api/dynamic/disasterStatus.php?DisGroupID=" + Group, function (DisInfo) {
            var DisObj = JSON.parse(DisInfo);
            // for(var key in DisObj.Clear){
            //     var DID = DisObj.Clear[key].DisID;
            //     disMarkers[DID].setMap(null);
            //     disMarkers[DID] = null;
            //     disContent[DID] = null;
            // }
            for(var key in DisObj.Current){
                var ThisObj = DisObj.Current[key];
                if(typeof(disMarkers[ThisObj.DisID]) == 'undefined' || disMarkers[ThisObj.DisID] == null){
                  disMarkers[ThisObj.DisID] = new google.maps.Marker({
                    'position': new google.maps.LatLng(ThisObj.lat, ThisObj.lng),
                    'icon': disasterImg,
                    'title': ThisObj.DisID
                  });
                  if(MapElems['disaster']){
                    disMarkers[ThisObj.DisID].setMap(map);
                  }
                }
                disContent[ThisObj.DisID] = disInfo(ThisObj);
            }
        });
      $("#UpTime_disaster").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
    }

    function suppliesStatus(){
        var Group="";
        for (var SID in supContent){
            Group = Group+","+SID;
        }
        $.get("http://opends.azurewebsites.net/api/dynamic/SuppliesStatus.php?SupGroupID=" + Group, function (SupData) {
            var SupObj = JSON.parse(SupData);
            // for(var key in SupObj.Clear){
            //     var SID = SupObj.Clear[key].SupID;
            //     supMarkers[SID].setMap(null);
            //     supMarkers[SID] = null;
            //     supContent[SID] = null;
            // }
            for(var key in SupObj.Current){
                var ThisObj = SupObj.Current[key];
                if(typeof(supMarkers[ThisObj.SupID]) == 'undefined' || supMarkers[ThisObj.SupID] == null){
                  supMarkers[ThisObj.SupID] = new google.maps.Marker({
                    'position': new google.maps.LatLng(ThisObj.lat, ThisObj.lng),
                    'icon': suppliesImg,
                    'title': ThisObj.SupID
                  });
                  if(MapElems['disaster']){
                    supMarkers[ThisObj.SupID].setMap(map);
                  }
                }
                supContent[ThisObj.SupID] = supInfo(ThisObj);
            }
        });
      $("#UpTime_supplies").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
    }

    function SyncData(_Type){
        if(SyncElems[_Type]){
            $("#sync" + _Type).removeClass("active");
            $("#gly" + _Type).removeClass('glyphicon-ok').addClass("glyphicon-remove");
            SyncElems[_Type] = false;
        }else{
            $("#sync" + _Type).addClass("active");
            $("#gly" + _Type).removeClass("glyphicon-remove").addClass('glyphicon-ok');
            SyncElems[_Type] = true;
        }
    }




