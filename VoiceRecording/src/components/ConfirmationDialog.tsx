// Core Imports
import React, { useState, useEffect } from "react"
import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Dialog,
  DialogContent,
  DialogProps,
} from "@material-ui/core"
import { useTranslation } from "react-i18next"

export default function ConfirmationDialog({
  confirmAction,
  confirmationMsg,
  ...props
}: {
  confirmAction: any
  confirmationMsg: string
} & DialogProps) {
  const { t } = useTranslation()
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    setIsClicked(false)
  }, [])

  return (
    <Dialog {...props} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{`${t("Confirmation")}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{`${t(confirmationMsg)}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => confirmAction(false)} color="primary">
          {`${t("No")}`}
        </Button>
        <Button
          onClick={() => {
            setIsClicked(true)
            confirmAction(true)
            setIsClicked(false)
          }}
          color="primary"
          autoFocus
          disabled={!!isClicked}
        >
          {`${t("Yes")}`}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
