package com.handmobile.cordova.hotpatch;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import android.util.Log;

public class ZipUtil {
	/**
     * 解压一个压缩文档 到指定位置
     *
     * @param zipFileString 压缩包的名字
     * @param outPathString 指定的路径
     * [url=home.php?mod=space&uid=2643633]@throws[/url] Exception
     */
    public static void UnZipFolder(String zipFileString, String outPathString) throws Exception {
    	
        java.util.zip.ZipInputStream inZip = new java.util.zip.ZipInputStream(new java.io.FileInputStream(zipFileString));
        java.util.zip.ZipEntry zipEntry;
        String szName = "";

        File outPathFile = new File(outPathString);
        if(outPathFile.exists()){
        	outPathFile.delete();
        }
        
        try {
            while ((zipEntry = inZip.getNextEntry()) != null) {
                szName = zipEntry.getName();

                if (zipEntry.isDirectory()) {

                    // get the folder name of the widget
                    szName = szName.substring(0, szName.length() - 1);
                    java.io.File folder = new java.io.File(outPathString + java.io.File.separator + szName);
                    folder.mkdirs();

                } else {

                	java.io.File file = null;
                        file = new java.io.File(outPathString + java.io.File.separator + szName);
                        file.createNewFile();

                    // get the output stream of the file
                    java.io.FileOutputStream out = new java.io.FileOutputStream(file);
                    int len;
                    byte[] buffer = new byte[1024];
                    // read (len) bytes into buffer
                    while ((len = inZip.read(buffer)) != -1) {
                        // write (len) byte from buffer at the position 0
                        out.write(buffer, 0, len);
                        out.flush();
                    }
                    out.close();
                }
            }//end of while

            inZip.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		
		}
        


    }
}
