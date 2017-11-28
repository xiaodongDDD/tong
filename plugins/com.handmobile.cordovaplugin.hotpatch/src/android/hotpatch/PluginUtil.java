package com.handmobile.cordova.hotpatch;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;

/**
 * Created by titengjiang on 16/2/29.
 */
public class PluginUtil {

    public static void showErrorMessage(String errorMessage,Context context)
    {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle("错误");
        builder.setMessage(errorMessage);
        builder.setPositiveButton("确认", new DialogInterface.OnClickListener() {

            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }


        });
        builder.show();


    }

}


